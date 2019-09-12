import React from 'react'
import { Form, Row, Col, Input, Select, Button, notification, Spin } from 'antd';
import CourseService from '../../../service/CourseService';

class CourseInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            course: {
                id: '',
                name: '',
                status: 1,
                description: '',
                createdTime: '',
                lastModified: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.isNameExisted = this.isNameExisted.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({isLoading: true});
                CourseService.updateCourse(values, this.props.id)
                .then(response => {
                    if (response.status === 200) {
                        notification.success({
                            message: 'Notification',
                            description: 'Add successfully!',
                            top: 70,
                            placement: 'topRight',
                        });
                        this.fetchData();
                        this.setState({isLoading: false});
                    } else {
                        notification.error({
                            message: 'Error',
                            description: response.message,
                            top: 70,
                            placement: 'topRight',
                        })
                        this.setState({isLoading: false});
                    }
                })
            }
        })
    }

    async isNameExisted(rule, value, callback) {
        if (value && value !== "") {
            let result = await CourseService.isCourseNameExisted(value, this.props.id);
            console.log('value ', value, 'id ', this.props.id, 'result ', result);
            if (!result) {
                callback();
            } else {
                callback(new Error(value + ' is existed!'));
            }
        } else {
            callback();
        }
    }

    fetchData() {
        this.setState({isLoading: true});
        CourseService.getCourseDetail(this.props.id)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                localStorage.setItem('loggedIn', false);
                this.setState({ redirecting: true });
            } else {
                this.setState({ isError: true, error: response });
            }
        }).then((data) => {
            if (data != null) {
                console.log(data);
                this.setState({course: data})
            }
        })
        this.setState({isLoading: false});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const creator = (this.state.course != null) ? this.state.course.creatorName + " - @" + this.state.course.creatorUsername : '';
        let modifier = '';
        if (this.state.course != null && this.state.course.modifierName) {
            modifier = this.state.course.modifierName + " - @" + this.state.course.modifierUsername;
        }

        return(
            <Spin spinning={this.state.isLoading}>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col lg={18} xs={24}>
                            <Form.Item label="ID">
                                {getFieldDecorator('id', {
                                    initialValue: this.state.course.id,
                                })(<Input disabled/>)}
                            </Form.Item>
                        </Col>

                        <Col lg={6} xs={24}>
                            <Form.Item label="Status">
                                {getFieldDecorator('status', {
                                    initialValue: this.state.course.status
                                })(
                                    <Select>
                                        <Option value={1}>Active</Option>
                                        <Option value={0}>Closed</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Name" hasFeedback>
                                {getFieldDecorator('name', {
                                    validateTrigger: 'onBlur',
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input course's name"
                                        },
                                        {
                                            validator: this.isNameExisted
                                        },
                                        {
                                            pattern: new RegExp("^[a-zA-Z0-9._\\s]+$"),
                                            message: "Contains only letters, number, '.' and _"
                                        }, 
                                        {
                                            max: 45,
                                            message: 'Maximum 45 characters'
                                        }
                                    ],
                                    initialValue: this.state.course.name
                                })(<Input/>)}
                            </Form.Item>
                        </Col>

                        <Col lg={12} xs={24}>
                            <Form.Item label="Description" hasFeedback>
                                {getFieldDecorator('description', {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input course's description"
                                        }, 
                                        {
                                            max: 255,
                                            message: 'Maximum 255 characters'
                                        }
                                    ],
                                    initialValue: this.state.course.description
                                })(<Input/>)}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Creator">
                                {getFieldDecorator('creator', {
                                    initialValue: creator
                                })(<Input disabled/>)}
                            </Form.Item>
                        </Col>

                        <Col lg={12} xs={24}>
                            <Form.Item label="Created Time">
                                {getFieldDecorator('createdTime', {
                                    initialValue: this.state.course.createdTime
                                })(<Input disabled/>)}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Modifier">
                                {getFieldDecorator('modifier', {
                                    initialValue: modifier
                                })(<Input disabled/>)}
                            </Form.Item>
                        </Col>

                        <Col lg={12} xs={24}>
                            <Form.Item label="Last modified">
                                {getFieldDecorator('lastModified', {
                                    initialValue: this.state.course.lastModified
                                })(<Input disabled/>)}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{display: 'flex', justifyContent: 'center'}}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Update</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        )
    }
}

const CourseInfo = Form.create({})(CourseInfoComponent)

class AccountInCourseComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            a: ''
        }
    }

    
}

class CourseDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a : ''
        }
    }

    render() {
        return(
            <div>
                <CourseInfo id={1}/>
            </div>
        )
    }
}

export default CourseDetailComponent;
