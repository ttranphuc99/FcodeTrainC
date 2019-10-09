import React from 'react'
import AccountCourseService from '../../../service/AccountCourseService';
import WorkService from '../../../service/WorkService';
import { Redirect, Link } from 'react-router-dom';
import { Select, Card, Tag, Spin, Table, Icon, Button } from 'antd';

class ListSubmissionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            listSub: [],
            redirecting: false,
            isError: false
        }

        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.props.courseId > 0 || false) {
            this.setState({isLoading: true});
            WorkService.getSubmissionByCourse(this.props.courseId)
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
                }
                this.setState({isLoading: false});
            })
        }
    }

    downloadFile(id) {
        WorkService.downloadFile('/member/work/' + id + '/file');
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
                            <Link to={'/member/submission/' + record.id}>{record.id}</Link> 
                            <Button size="small" style={{marginLeft: '15px'}} onClick={() => this.downloadFile(record.id)}>
                                <Icon type="download" />
                            </Button>
                        </div>
                    ) 
                }
            },
            {
                title: 'Assignment',
                key: 'assignment',
                render: record => {
                    return record.assignment.id;
                }
            },
            {
                title: 'Submit Quantity',
                key: 'submitQuantity',
                dataIndex: 'submitQuantity'
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
                }
            },
            {
                title: 'Submit time',
                key: 'submitTime',
                dataIndex: 'submitTime'
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
                        pagination={{pageSize: 10}}/>
                </Card>
            </Spin>
        )
    }
}

class SubmissionComponent extends React.Component {
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
        AccountCourseService.getCourseOfAccount()
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

export default SubmissionComponent;