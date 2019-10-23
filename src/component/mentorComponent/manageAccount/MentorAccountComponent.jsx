import React from 'react';
import { Spin, Button, Icon, Modal, Card, Table, Input, notification, Tag } from 'antd';
import { Redirect } from 'react-router-dom';
import AccountService from '../../../service/AccountService';
import UniversityCourseService from '../../../service/UniversityCourseService';
import ProfileDetailComponent from '../../authComponent/manageAccount/ProfileDetailComponent'; 

class MentorAccountComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirecting: false,
            isError: false,
            isLoading: false,
            newModalVisible: false,
            firstRenderNewModal: true,
            detailModalVisible: false,
            confirmLoading: false,
            data: [],
            listCourse: []
        }

        this.getListAccount = this.getListAccount.bind(this);
        this.finishLoadNewAccount = this.finishLoadNewAccount.bind(this);
        this.loadNewAccount = this.loadNewAccount.bind(this);
        this.showDetailModal = this.showDetailModal.bind(this);
        this.showNewModal = this.showNewModal.bind(this);
        this.closeDetailModal = this.closeDetailModal.bind(this);
        this.closeNewModal = this.closeNewModal.bind(this);
        this.showNotFound = this.showNotFound.bind(this);
    }

    componentWillMount() {
        this.getListAccount();
    }

    getListAccount() {
        this.setState({ isLoading: true })
        AccountService.getListAccountByRole(this.props.accRole)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                localStorage.setItem('loggedIn', false);
                this.setState({ redirecting: true });
            } else {
                this.setState({ isError: true, error: response });
            }
        }).then(json => {
            if (json != null) {
                this.setState({
                    isLoading: false,
                    data: json
                })
                this.setListCourse();
            }
        }).catch((err) => {
            this.setState({ isError: true, error: err });
        });
    }

    setListCourse() {
        UniversityCourseService.getListCourse()
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                localStorage.setItem('loggedIn', false);
                this.setState({ redirecting: true });
            } else {
                this.setState({ isError: true, error: response });
            }
        }).then(json => {
            console.log('list  ', json);
            if (Array.isArray(json)) {
                const start = async(data) => {
                    let listCourse = [];
                    await this.asyncForEach(data, async(row) => {			
                        let course = {text: row.name, value: row.name};
                        listCourse.push(course);
                    })	
                    return listCourse;
                }
                return start(json);
            }
        }).then(listCourse => {
            this.setState({listCourse: listCourse});
        }).catch((err) => {
            this.setState({ isError: true, error: err });
        });
    }

    async asyncForEach(array, callback) {	
        for (let index = 0; index < array.length; index++) {	
          await callback(array[index], index, array);	
        }	
    }

    handleChange(pagination, filters, sorter) {
        this.setState({
            filterInfo: filters,
            sortedInfo: sorter
        });
    }

    showNewModal() {
        this.setState({ newModalVisible: true });
        if (this.state.firstRenderNewModal) {
            this.setState({ firstRenderNewModal: false })
        } else {
            this.addNewAccount.getListCourse();
        }
    }

    async showDetailModal(username) {
        await this.setState({ detailModalVisible: true, detailUsername: username });
        this.refs.profileDetail.fetchData();
    }

    closeNewModal() {
        this.setState({ newModalVisible: false })
        this.getListAccount()
    }

    closeDetailModal() {
        this.setState({ detailModalVisible: false })
        this.getListAccount()
    }

    loadNewAccount() {
        this.setState({ confirmLoading: true })
        this.getListAccount()
    }

    finishLoadNewAccount() {
        this.setState({ confirmLoading: false })
        this.getListAccount()
    }

    showNotFound() {
        notification.error({
            message: 'Error',
            description: "Not found user " + this.state.detailUsername,
            top: 70,
            placement: 'topRight',
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {this.searchInput = node;}}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const columns = [
            {
                title: 'ID',
                key: 'id',
                render: record => {
                    return <Button 
                        style={{padding: '0'}}
                        type="link" 
                        onClick={() => this.showDetailModal(record.username)}
                    >{record.id}</Button>
                },
                sorter: (a,b) => a.id - b.id,
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                ...this.getColumnSearchProps('username')
            },
            {
                title: 'Fullname',
                key: 'fullname',
                dataIndex: 'fullname',
                ...this.getColumnSearchProps('fullname'),
            },
            {
                title: 'Course',
                key: 'universityCourse',
                filters: this.state.listCourse,
                onFilter: (value, record) => record.universityCourse.name === value.toUpperCase(),
                sorter: (a, b) => {
                    return a.universityCourse.name.localeCompare(b.universityCourse.name)
                },
                render: record => {
                    if (record.universityCourse) {
                        return <span>{record.universityCourse.name}</span>
                    }
                    return '';
                },
            },
            {
                title: 'Status',
                key: 'status',
                render: record => {
                    switch (record.status) {
                        case 1: return (<Tag color="blue">Active</Tag>)
                        case 0: return (<Tag color="grey">Blocked</Tag>)
                        default: return ''
                    }
                },
                align: 'center'
            }
        ];

        return (
            <Spin spinning={this.state.isLoading}>
                <Modal 
                    title={this.props.accRole === 3 ? "Mentor Detail" : "Member Detail"}
                    visible={this.state.detailModalVisible}
                    onCancel={this.closeDetailModal}
                    footer={null}
                >
                    <ProfileDetailComponent 
                        ref="profileDetail"
                        username={this.state.detailUsername} 
                        isAuth={true}
                        notFound={this.showNotFound}/>
                </Modal>

                <Card style={{overflow: 'auto'}}>
                    <Table 
                        rowKey={record => record.id} 
                        columns={columns} 
                        dataSource={this.state.data} 
                        style={{minWidth: '700px'}} 
                        pagination={{pageSize: 10}}/>
                </Card>
            </Spin>
        )
    }
}

export default MentorAccountComponent;