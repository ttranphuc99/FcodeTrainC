import React from 'react';
import { Form, Spin, Button, Icon, Modal, Card, Table, Input, notification, Select } from 'antd';
import { Redirect } from 'react-router-dom';
import AccountService from '../../../service/AccountService';
import LoginService from '../../../service/LoginService';
import UniversityCourseService from '../../../service/UniversityCourseService';
import ProfileDetailComponent from './ProfileDetailComponent';

class AddNewAccountComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            course: []
        }

        this.isUsernameExisted = this.isUsernameExisted.bind(this);
        this.getListCourse = this.getListCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getListCourse();
    }

    async isUsernameExisted(rule, value, callback) {
        if (value && value !== "") {
            let result = await AccountService.isUsernameExisted(value);
            if (!result) {
                callback();
            } else {
                callback(new Error(value + ' is existed!'));
            }
        } else {
            callback();
        }
    }

    getListCourse() {
        this.setState({ isLoading: true });
        UniversityCourseService.getListCourse()
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                notification.error({
                    message: 'Error',
                    description: response.message,
                    top: 70,
                    placement: 'topRight',
                });
            }
        }).then(data => {
            if (data !== null) {
                this.setState({ course: data, isLoading: false });
            } else {
                this.props.closeModal();
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AccountService.newAccount(values, this.props.accRole)
                .then(response => {
                    if (response.status === 201) {
                        notification.success({
                            message: 'Notification',
                            description: 'Add successfully!',
                            top: 70,
                            placement: 'topRight',
                        });
                        this.props.closeModal();
                    } else {
                        notification.error({
                            message: 'Error',
                            description: response.message,
                            top: 70,
                            placement: 'topRight',
                        })
                    }
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        const {Option} = Select;
        const listCourse = this.state.course.map((course) => {
            return <Option key={course.id} value={course.id}>{course.name}</Option>
        });

        return (
            <Spin spinning={this.state.isLoading}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Username" hasFeedback>
                        {getFieldDecorator('username', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input username'
                                },
                                {
                                    validator: this.isUsernameExisted
                                },
                                {
                                    pattern: new RegExp("^[a-zA-Z0-9._]+$"),
                                    message: "Contains only letters, number, '.' and _"
                                }, 
                                {
                                    max: 45,
                                    message: 'Maximum 50 characters'
                                }
                            ]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="Fullname" hasFeedback>
                        {getFieldDecorator('fullname', {
                            rules: [
                                {
                                    pattern: new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"),
                                    message: "Not contains special chacracter"
                                },
                                {
                                    max: 50,
                                    message: 'Maximum 50 characters'
                                }
                            ]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="University Course" hasFeedback>
                        {getFieldDecorator('universityCourse', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: "Please choose university course"
                                }
                            ]
                        })(
                            <Select placeholder="Select university course">
                                {listCourse}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
} 

const AddNewAccount = Form.create({})(AddNewAccountComponent); 

class AccountComponent extends React.Component {
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
                title: 'Action',
                key: 'action',
                render: record => {
                    if (record.username === LoginService.getUsername()) return ''
                    return (
                        <div>
                            <Button type="danger" onClick={() => this.showConfirm(record.id, record.name)}>Ban</Button>
                        </div>
                    )
                }
            }
        ];

        return (
            <Spin spinning={this.state.isLoading}>
                <Button type="primary" onClick={this.showNewModal}>
                    <Icon type="plus" />{this.props.accRole === 3 ? "Insert Mentor" : "Insert Member"}
                </Button>

                <Modal 
                    title={this.props.accRole === 3 ? "Insert Mentor" : "Insert Member"}
                    visible={this.state.newModalVisible}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.closeNewModal}
                    footer={null}
                >
                    <AddNewAccount 
                        wrappedComponentRef={(inst) => this.addNewAccount = inst}
                        closeModal={this.closeNewModal} 
                        updateData={this.fetchData} 
                        load={this.state.loadNewAccount}
                        finish={this.state.finishLoadNewAccount}
                        accRole={this.props.accRole}/>
                </Modal>

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

export default AccountComponent;