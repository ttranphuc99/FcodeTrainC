import React from 'react'
import { Redirect, Link } from 'react-router-dom';
import AssignmentService from '../../../service/AssignmentService';
import { Form, Spin, Row, Col, Input, InputNumber, Select, Card, Button, notification } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class AssignmentDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isError: false,
            error: 'Error',
            redirecting: false,
            editorVal: '',
            assignment: {
                id: '-1',
                title: '',
                content: '',
                mark: 0,
                submitQuantity: 0,
                createdTime: 0,
                lastModified: 0,
                creatorName: '',
                creatorUsername: '',
                modifierName: '',
                modifierUsername: '',
                status: 0,
                course: {
                    id: -1
                }
            }
        }
        this.fetchData = this.fetchData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editorEdit = this.editorEdit.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({isLoading: true});
        AssignmentService.getAssDetail(this.props.match.params.id)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                localStorage.setItem('loggedIn', false);
                this.setState({ redirecting: true });
            } else {
                this.setState({
                    isError: false
                })
            }
        }).then(data => {
            console.log(data);
            if (data != null) {
                this.setState({assignment: data, editorVal: data.content})
            }
            this.setState({isLoading: false});
        })
    }

    editorEdit(event, editor) {
        this.setState({editorVal: editor.getData()});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                values.content = this.state.editorVal;
                AssignmentService.update(values, this.props.match.params.id)
                .then(response => {
                    if (response.status === 200) {
                        notification.success({
                            message: 'Notification',
                            description: 'Add successfully!',
                            top: 70,
                            placement: 'topRight',
                        });
                        this.fetchData();
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
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const {getFieldDecorator} = this.props.form;
        const {Option} = Select;

        const creator = this.state.assignment.creatorName + " - @" + this.state.assignment.creatorUsername;
        const modifier = (this.state.assignment.modifierName !== null) ? (this.state.assignment.modifierName + " - @" + this.state.assignment.modifierUsername) : '';

        return (
            <div>
            {!this.state.isLoading &&
            <div>
                <Button>
                    <Link to={'/manageAssignment/' + this.state.assignment.course.id}>Back</Link>
                </Button>
                <Card>
                    <Spin spinning={this.state.isLoading}>
                        <Form onSubmit={this.handleSubmit}>
                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Form.Item label="ID">
                                        {getFieldDecorator('id', {initialValue: this.state.assignment.id})(<Input disabled/>)}
                                    </Form.Item>
                                </Col>

                                <Col lg={12} xs={24}>
                                    <Form.Item label="Status">
                                        {getFieldDecorator('status', {initialValue: this.state.assignment.status})(
                                            <Select>
                                                <Option value={1}>Active</Option>
                                                <Option value={0}>Closed</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col lg={14} xs={24}>
                                    <Form.Item label="Title" hasFeedback>
                                        {getFieldDecorator('title', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input ...'
                                                },
                                                {
                                                    max: 255,
                                                    message: 'Maximum 255 characters'
                                                },
                                            ],
                                            initialValue: this.state.assignment.title
                                        })(<Input/>)}
                                    </Form.Item>
                                </Col>

                                <Col lg={5} xs={12}>
                                    <Form.Item label="Submit Quantity" hasFeedback>
                                        {getFieldDecorator('submitQuantity', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input ...'
                                                }
                                            ],
                                            initialValue: this.state.assignment.submitQuantity
                                        })(<InputNumber style={{width: '100%'}} min={1} max={5}/>)}
                                    </Form.Item>
                                </Col>

                                <Col lg={5} xs={12}>
                                    <Form.Item label="Mark" hasFeedback>
                                        {getFieldDecorator('mark', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input ...'
                                                }
                                            ],
                                            initialValue: this.state.assignment.mark
                                        })(<InputNumber style={{width: '100%'}} min={1} max={50}/>)}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Content">
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={this.editorEdit}
                                    data={this.state.assignment.content}/>
                            </Form.Item>

                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Form.Item label="Creator">
                                        {getFieldDecorator('creator', {initialValue: creator})(<Input disabled/>)}
                                    </Form.Item>
                                </Col>

                                <Col lg={12} xs={24}>
                                    <Form.Item label="Created Time">
                                        {getFieldDecorator('createdTime', {initialValue: this.state.assignment.createdTime})(<Input disabled/>)}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Form.Item label="Modifier">
                                        {getFieldDecorator('modifier', {initialValue: modifier})(<Input disabled/>)}
                                    </Form.Item>
                                </Col>

                                <Col lg={12} xs={24}>
                                    <Form.Item label="Last Modified">
                                        {getFieldDecorator('lastModified', {initialValue: this.state.assignment.lastModified})(<Input disabled/>)}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                                <Button type="primary" htmlType="submit">Update</Button>
                            </div>
                        </Form>
                    </Spin>
                </Card>
            </div>}
            </div>
        )
    }
}

export default Form.create({})(AssignmentDetailComponent);
