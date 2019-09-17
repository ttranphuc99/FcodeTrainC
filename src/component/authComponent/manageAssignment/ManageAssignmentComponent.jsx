import React from 'react'
import CourseService from '../../../service/CourseService';
import { Redirect } from 'react-router-dom';
import { Select, Card } from 'antd';
import AssignmentComponent from './AssignmentComponent';

class ManageAssignmentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingCourse: false,
            listCourse: [],
            redirecting: false,
            isError: false,
            currentCourseId: -1
        }

        this.loadAssignment = this.loadAssignment.bind(this);
        this.getListCourse = this.getListCourse.bind(this);
        this.loadAssignment = this.loadAssignment.bind(this);
    }

    componentDidMount() {
        this.getListCourse();
        if (this.props.match.params.courseId) {
            this.loadAssignment(this.props.match.params.courseId);
        }
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
                console.log(data);
                this.setState({listCourse: data});
            }
            this.setState({isLoadingCourse: false});
        }).catch((err) => {
            this.setState({ isError: true, error: err });
            this.setState({isLoadingCourse: false});
        })
    }

    async loadAssignment(courseId) {
        await this.setState({currentCourseId: courseId});
        if (this.refs.assignment !== undefined) this.refs.assignment.fetchData();
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const {Option} = Select;
        return (
            <Card>
                <Select 
                    loading={this.state.isLoadingCourse}
                    placeholder="Select Course ..."
                    onChange={this.loadAssignment}
                    style={{width: '25%', minWidth: '200px'}}
                    defaultValue={parseInt(this.props.match.params.courseId) || 'Select Course...'}
                >
                    {this.state.listCourse.map(course => (
                        <Option key={course.id} value={course.id}>{course.name}</Option>   
                    ))}
                </Select>

                {this.state.currentCourseId > 0 && <AssignmentComponent ref="assignment" courseId={this.state.currentCourseId}/>}
            </Card>
        )
    }
}

export default ManageAssignmentComponent;
