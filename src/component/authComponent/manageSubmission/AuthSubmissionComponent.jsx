import React from 'react'
import CourseService from '../../../service/CourseService';
import WorkService from '../../../service/WorkService';
import { Redirect, Link } from 'react-router-dom';
import { Select, Card, Tag, Spin, Table, Icon, Button, Input, Modal, notification, Form } from 'antd';
import ProfileDetailComponent from '../manageAccount/ProfileDetailComponent';
import JudgeComponent from './JudgeComponent';

class ListSubmissionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            listSub: [],
            redirecting: false,
            isError: false,
            listAss: [],
            detailModalVisible: false,
            detailUsername: '',
            judgeModalVisible: false,
            currentSubmisionId: ''
        }

        this.fetchData = this.fetchData.bind(this);
        this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.getListAssignment = this.getListAssignment.bind(this);
        this.showDetailModal = this.showDetailModal.bind(this);
        this.closeDetailModal = this.closeDetailModal.bind(this);
        this.openJudgeModal = this.openJudgeModal.bind(this);
        this.closeJudgeModal = this.closeJudgeModal.bind(this);
        this.updateRecord = this.updateRecord.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.props.courseId > 0 || false) {
            this.setState({isLoading: true});
            WorkService.adminGetSubmissionByCourse(this.props.courseId)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    localStorage.setItem('loggedIn', false);
                    this.setState({ redirecting: true });
                } else {
                    this.setState({ isError: true, error: response });
                }
            }).then(data => {
                if (data != null) {
                    this.setState({listSub: data});
                    this.getListAssignment();
                }
                this.setState({isLoading: false});
            })
        }
    }

    downloadFile(id) {
        WorkService.downloadFile('/member/work/' + id + '/file');
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
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    async getListAssignment() {
        await this.state.listSub.forEach((row) => {
            let ass = {text: row.assignment.id, value: row.assignment.id};
            let index = this.state.listAss.findIndex(row => row.text === ass.text);
            if (index < 0) this.state.listAss.push(ass);
        })
    }

    async showDetailModal(username) {
        await this.setState({ detailModalVisible: true, detailUsername: username });
        this.refs.profileDetail.fetchData();
    }

    closeDetailModal() {
        this.setState({ detailModalVisible: false })
    }

    showNotFound() {
        notification.error({
            message: 'Error',
            description: "Not found user " + this.state.detailUsername,
            top: 70,
            placement: 'topRight',
        })
    }

    async openJudgeModal(submissionId, status, comment) {
        await this.setState({
            judgeModalVisible: true, 
            currentSubmisionId: submissionId, 
            currentStatus: status, 
            currentComment: comment !== null ? comment : ''
        });
        this.form.refresh();
    }

    closeJudgeModal() {
        this.setState({judgeModalVisible: false})
    }

    updateRecord(submissionId, status) {
        console.log('submit ' , submissionId, ' status', status)

        let updatedList = this.state.listSub;
        let index = updatedList.findIndex((row) => row.id === submissionId);
        
        updatedList[index].status = status;

        this.setState({listSub: updatedList});
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const column = [
            {
                title: 'ID',
                key: 'id',
                render: record => {
                    return (
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Link to={'/manageSubmission/' + record.id} target="_blank">{record.id}</Link> 
                            <Button size="small" style={{marginLeft: '15px'}} onClick={() => this.downloadFile(record.id)}>
                                <Icon type="download" />
                            </Button>
                        </div>
                    ) 
                },
                sorter: (a,b) => a.id - b.id,
                width: 150,
                fixed: 'left'
            },
            {
                title: 'Worker',
                key: 'worker',
                render: record => {
                    return (
                        <Button 
                            style={{padding: '0'}}
                            type="link" 
                            onClick={() => this.showDetailModal(record.worker.username)}
                        >{record.worker.fullname} - @{record.worker.username}</Button>
                    )
                },
                width: 200,
                fixed: 'left'
            },
            {
                title: 'Assignment',
                key: 'assignment',
                render: record => {
                    return record.assignment.id;
                },
                width: 170,
                filters: this.state.listAss,
                onFilter: (value, record) => record.assignment.id === value,
            },
            {
                title: 'Submit Quantity',
                key: 'submitQuantity',
                dataIndex: 'submitQuantity',
                sorter: (a,b) => a.submitQuantity - b.submitQuantity,
                width: 50
            },
            {
                title: 'Submit time',
                key: 'submitTime',
                dataIndex: 'submitTime',
                sorter: (a,b) => {
                    if (a.submitTime > b.submitTime) return 1;
                    return -1;
                }
            },
            {
                title: 'Status',
                key: 'status',
                render: (record) => {
                    switch (record.status) {
                        case 0: return <Tag color="magenta">Waiting</Tag>
                        case 1: return <Tag color="blue">Success</Tag>
                        case -1 : return <Tag color="gold">Wrong</Tag>
                        case -2: return <Tag color="cyan">Run-Error</Tag>
                        case -3: return <Tag color="red">Rejected</Tag>
                        default: return ''
                    }
                },
                filters: [
                    { text: 'Waiting', value: 0 },
                    { text: 'Success', value: 1 },
                    { text: 'Wrong', value: -1 },
                    { text: 'Run Error', value: -2 },
                    { text: 'Rejected', value: -3 },
                ],
                onFilter: (value, record) => record.status === value,
                width: 50,
                fixed: 'right'
            },
            {
                title: 'Judge',
                key: 'judge',
                render: row => {
                    return (
                        <Button onClick={() => this.openJudgeModal(row.id, row.status, row.comment)}>
                            <Icon type="flag" />
                        </Button>
                    )
                },
                width: 100,
                fixed: 'right'
            }
        ]
        return (
            <Spin spinning={this.state.isLoading}>
                <Card style={{overflow: 'auto'}}>
                    <Table
                        rowKey={record => record.id}
                        columns={column}
                        dataSource={this.state.listSub}
                        style={{minWidth: '700px'}}
                        pagination={{pageSize: 10}}
                        scroll={{x: 1150}}/>
                </Card>

                <Modal 
                    title={"Member Detail"}
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

                <Modal
                    title={"Judge " + this.state.currentSubmisionId}
                    visible={this.state.judgeModalVisible}
                    onCancel={this.closeJudgeModal}
                    footer={null}
                    >
                        <JudgeComponent 
                            ref="judgeSubmission"
                            submissionId={this.state.currentSubmisionId} 
                            update={this.updateRecord} 
                            status={this.state.currentStatus}
                            comment={this.state.currentComment}
                            closeModal={this.closeJudgeModal}
                            wrappedComponentRef={(form) => this.form = form}/>
                </Modal>
            </Spin>
        )
    }
}

class AuthSubmissionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listCourse: [],
            isLoadingCourse: false,
            isError: false,
            redirecting: false
        }

        this.getListCourse = this.getListCourse.bind(this);
        this.loadSubmission = this.loadSubmission.bind(this);
    }

    componentWillMount() {
        this.getListCourse();
    }

    getListCourse() {
        this.setState({isLoadingCourse: true});
        CourseService.getListCourse()
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                localStorage.setItem('loggedIn', false);
                this.setState({ redirecting: true });
            } else {
                this.setState({ isError: true, error: response });
            }
        }).then(data => {
            if (data != null) {
                this.setState({listCourse: data});
            }

            if (parseInt(this.props.match.params.courseId)) {
                this.setState({
                    defaulVal: parseInt(this.props.match.params.courseId),
                    currentCourseId: parseInt(this.props.match.params.courseId),
                    isLoadingCourse: false
                })
            } else {
                this.setState({
                    isLoadingCourse: false, 
                    defaulVal: (this.state.listCourse.length > 0) ? this.state.listCourse[0].id : 'Select course...',
                    currentCourseId: (this.state.listCourse.length > 0) ? this.state.listCourse[0].id : 0
                });
            }
        }).catch((err) => {
            this.setState({ isError: true, error: err });
            this.setState({isLoadingCourse: false});
        })
    }

    async loadSubmission(courseId) {
        await this.setState({
            currentCourseId: courseId,
            defaulVal: courseId
        });
        if (this.refs.submission !== undefined) this.refs.submission.fetchData();
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const {Option} = Select;
        return (
            <Card>
                {!this.state.isLoading && 
                <div>
                    <span className="mr-5">Select Course:</span>
                    <Select 
                        loading={this.state.isLoadingCourse}
                        placeholder="Select Course ..."
                        onChange={this.loadSubmission}
                        style={{width: '25%', minWidth: '200px'}}
                        defaultValue={'Select course ...'}
                        value={this.state.defaulVal}
                    >
                        {this.state.listCourse.map(course => (
                            <Option key={course.id} value={course.id}>{course.name}</Option>   
                        ))}
                    </Select>
                </div>
                
                }

                {this.state.currentCourseId > 0 && <ListSubmissionComponent ref="submission" courseId={this.state.currentCourseId}/>}
            </Card>
        )
    }
}

export default AuthSubmissionComponent;
