import React from 'react'
import { Redirect } from 'react-router-dom';
import { Form, Spin, Button, Icon, Card, Table, Input, Row, Col } from 'antd'
import AssignmentService from '../../../service/AssignmentService';
import WorkService from '../../../service/WorkService';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class NewAssignmentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            editorVal : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editorEdit = this.editorEdit.bind(this);
    }

    handleSubmit(e) {
        console.log('s');
        e.preventDefault();
        this.props.form.validateFields((err, values) =>{
            values.content = this.state.editorVal;
            console.log(values);
        })
    }

    editorEdit(event, editor) {
        this.setState({editorVal: editor.getData()});
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
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
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>

                <Row gutter={16}>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Submit Quantity" hasFeedback>
                            {getFieldDecorator('submitQuantity', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input ...'
                                    },
                                    {
                                        type: 'integer',
                                        message: 'Must be a number between 1 and 5'
                                    }, 
                                    {
                                        range: {min: 1, max: 5},
                                        message: 'Must be a number between 1 and 5'
                                    }
                                ]
                            })(<Input/>)}
                        </Form.Item>
                    </Col>

                    <Col lg={12} xs={24}>
                        <Form.Item label="Mark" hasFeedback>
                            {getFieldDecorator('mark', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input ...'
                                    },
                                    {
                                        type: 'integer',
                                        message: 'Must be a number between 1 and 50'
                                    }, 
                                    {
                                        range: {min: 1, max: 50},
                                        message: 'Must be a number between 1 and 50'
                                    }
                                ]
                            })(<Input/>)}
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Content">
                    {getFieldDecorator('content', {

                    })(
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={this.editorEdit}/>
                    )}
                </Form.Item>

                <Form.Item style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        )
    }
}

const NewAssignment = Form.create({})(NewAssignmentComponent);

class AssignmentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            listAss: [],
            redirecting: false,
            isError: false
        }

        this.fetchData = this.fetchData.bind(this);
        this.asyncForEach = this.asyncForEach.bind(this);
    }

    componentWillMount() {
        // this.fetchData();
    }

    fetchData() {
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
                dataIndex: 'id'
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
                title: 'Creator',
                key: 'creator',
                render: record => {
                    return record.creatorFullname + " - @" + record.creatorUsername
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
                <Button type="primary">
                    <Icon type="plus" />Add new course
                </Button>

                <NewAssignment/>

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

export default AssignmentComponent;