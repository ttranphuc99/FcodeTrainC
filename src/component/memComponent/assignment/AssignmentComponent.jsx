import React from 'react'
import { Redirect, Link } from 'react-router-dom';
import { Select, Card, Spin, Table, Button, Tag } from 'antd';
import CourseService from '../../../service/CourseService';
import AccountCourseService from '../../../service/AccountCourseService';
import WorkService from '../../../service/WorkService';
import AssignmentService from '../../../service/AssignmentService';

class ListAssignmentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            listAss: [],
            newAssModal: false,
            redirecting: false,
            isError: false
        }

        this.fetchData = this.fetchData.bind(this);
        this.asyncForEach = this.asyncForEach.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.props.courseId > 0 || false) {
            this.setState({isLoading: true});
            AssignmentService.getListAssByCourse(this.props.courseId)
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
                    const start = async(data) => {
                        await this.asyncForEach(data, async(row) => {		
                            let response = await WorkService.countWorkSuccessByAss(row.id);	

                            if (response.status === 200) {	
                                let text = await response.text();	
                                row["completed"] = text	
                            }

                            response = await WorkService.countWorkUnsuccessByAss(row.id);

                            if (response.status === 200) {	
                                let text = await response.text();	
                                row["submitted"] = text	
                            }
                        })	
                        return data;
                    }
                    return start(data);
                }
            }).then(data => {
                if (data != null) {
                    this.setState({listAss: data});
                }
                this.setState({isLoading: false});
            })
        }
    }

    async asyncForEach(array, callback) {	
        for (let index = 0; index < array.length; index++) {	
          await callback(array[index], index, array);	
        }	
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const column = [
            {
                title: 'ID',
                key: 'id',
                render: record => {
                    return <Link to={'/member/assignment/' + record.id}>{record.id}</Link> 
                }
            },
            {
                title: 'Title',
                key: 'title',
                dataIndex: 'title'
            },
            {
                title: 'Mark',
                key: 'mark',
                dataIndex: 'mark'
            },
            {
                title: 'Status',
                key: 'status',
                render: (record) => {
                    if (record.status === 0) {
                        return <Tag color="red">Close</Tag>
                    } else {
                        return <Tag color="blue">Open</Tag>
                    }
                }
            },
            {
                title: 'Creator',
                key: 'creator',
                render: record => {
                    return record.creatorName + " - @" + record.creatorUsername
                }
            },
            {
                title: 'Submitted',
                key: 'submitted',
                dataIndex: 'submitted'
            },
            {
                title: 'Completed',
                key: 'completed',
                dataIndex: 'completed'
            }
        ]
        return (
            <Spin spinning={this.state.isLoading}>
                <Card style={{overflow: 'auto'}}>
                    <Table
                        rowKey={record => record.id}
                        columns={column}
                        dataSource={this.state.listAss}
                        style={{minWidth: '700px'}}
                        pagination={{pageSize: 10}}/>
                </Card>
            </Spin>
        )
    }
}

class AssignmentComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            listCourse: [],
            redirect: false,
            isError: false,
            defaulVal: null
        }

        this.loadAssignment = this.loadAssignment.bind(this);
        this.getListCourse = this.getListCourse.bind(this);
    }

    componentWillMount() {
        this.getListCourse();
        if (this.props.match.params.courseId) {
            this.loadAssignment(this.props.match.params.courseId);
        }
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
            this.setState({
                isLoadingCourse: false, 
                defaulVal: (this.state.listCourse.length > 0) ? this.state.listCourse[0].id : 'Select course...',
                currentCourseId: (this.state.listCourse.length > 0) ? this.state.listCourse[0].id : 0
            });
        }).catch((err) => {
            this.setState({ isError: true, error: err });
            this.setState({isLoadingCourse: false});
        })
    }
    
    async loadAssignment(courseId) {
        console.log('valueeee ', courseId)
        await this.setState({
            currentCourseId: courseId,
            defaulVal: courseId
        });
        if (this.refs.assignment !== undefined) this.refs.assignment.fetchData();
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
                        onChange={this.loadAssignment}
                        style={{width: '25%', minWidth: '200px'}}
                        defaultValue={parseInt(this.props.match.params.courseId) || 'Select course ...'}
                        value={this.state.defaulVal}
                    >
                        {this.state.listCourse.map(course => (
                            <Option key={course.id} value={course.id}>{course.name}</Option>   
                        ))}
                    </Select>
                </div>
                
                }

                {this.state.currentCourseId > 0 && <ListAssignmentComponent ref="assignment" courseId={this.state.currentCourseId}/>}
            </Card>
        )
    }
}

export default AssignmentComponent;
