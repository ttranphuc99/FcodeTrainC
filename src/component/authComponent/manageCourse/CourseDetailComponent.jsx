import React from 'react'
import { Form, Row, Col, Input, Select, Button } from 'antd';
import CourseService from '../../../service/CourseService';

class CourseInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    componentWillMount() {
        this.fetchData();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

            }
        })
    }

    fetchData() {
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

                <Row>
                    <Col span={24}>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
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
        )
    }
}

const CourseInfo = Form.create({})(CourseInfoComponent)

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
