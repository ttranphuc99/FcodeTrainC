import React from 'react'
import CourseService from '../../service/CourseService';
import { Form, Select, Button, notification } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AnnouncementService from '../../service/AnnouncementService';

class NewAnnouncementComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            listCourse: [],
            currentCourseId: -1,
            content: '',
            announcement: null
        }

        this.getListCourse = this.getListCourse.bind(this);
        this.changeCourse = this.changeCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.editorEdit = this.editorEdit.bind(this);
    }

    getListCourse() {
        this.setState({isLoading: true});
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
                if (data.length > 0) {
                    this.setState({currentCourseId: data[0].id});
                }
            }
            this.setState({isLoadingCourse: false});
        }).catch((err) => {
            this.setState({ isError: true, error: err });
            this.setState({isLoadingCourse: false});
        })
    }

    fetchData() {
        this.getListCourse();

        AnnouncementService.getAnnouncement(this.props.id)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Error',
                    top: 70,
                    placement: 'topRight',
                })
                this.props.closeModal();
            }
        }).then(data => {
            if (data != null) {
                this.setState({
                    announcement: data, 
                    currentCourseId: data.course.id, 
                    content: data.content,
                    isLoading: false
                }); 
            }
        })
    }

    changeCourse(courseId) {
        this.setState({currentCourseId: courseId});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
              values.content = this.state.content;
              values.courseId = this.state.currentCourseId;

            AnnouncementService.update(values, this.props.id)
            .then(response => {
                if (response.status === 200) {
                    notification.success({
                        message: 'Notification',
                        description: 'Update successfully!',
                        top: 70,
                        placement: 'topRight',
                    });
                    this.props.closeModal();
                    this.props.form.resetFields();
                } else {
                    notification.error({
                        message: 'Error',
                        description: 'Error',
                        top: 70,
                        placement: 'topRight',
                    })
                }
              })
            }
        });
    }

    editorEdit(value) {
        this.setState({content: value});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { Option } = Select;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item title="Course">
                    <Select
                        loading={this.state.isLoading}
                        placeholder="Select course..."
                        style={{width: '25%', minWidth: '200px'}}
                        onChange={this.changeCourse}
                        value={this.state.currentCourseId}
                    >
                        {this.state.listCourse.map(course => (
                            <Option key={course.id} value={course.id}>{course.name}</Option>   
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item title="Title">
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: 'Title is required!'
                            },
                            {
                                max: 255,
                                message: 'Maximum 255 characters'
                            }
                        ],
                        initialValue: this.state.announcement.title
                    })}
                </Form.Item>

                <Form.Item title="Content">
                    <CKEditor
                        editor={ClassicEditor}
                        onChange={this.editorEdit}
                        data={this.state.content}/>
                </Form.Item>

                <Form.Item style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({})(NewAnnouncementComponent);
