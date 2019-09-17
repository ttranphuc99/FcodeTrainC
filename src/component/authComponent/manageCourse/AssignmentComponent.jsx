import React from 'react'
import { Redirect } from 'react-router-dom';
import { Form, Spin, Button, Icon, Card, Table, Input, Row, Col, notification, InputNumber, Modal, Tag } from 'antd'
import AssignmentService from '../../../service/AssignmentService';
import WorkService from '../../../service/WorkService';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../../stylesheet/EditorStyleSheet.css';
import AssignmentDetailComponent from './AssignmentDetailComponent';

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
        e.preventDefault();
        this.props.form.validateFields((err, values) =>{
            if (!err) {
                values.content = this.state.editorVal;
                AssignmentService.addNewAss(this.props.id, values)
                .then(response => {
                    if (response.status === 201) {
                        notification.success({
                            message: 'Notification',
                            description: 'Add successfully!',
                            top: 70,
                            placement: 'topRight',
                        });
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

    editorEdit(event, editor) {
        this.setState({editorVal: editor.getData()});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <Form onSubmit={this.handleSubmit}>
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
                                    }
                                ]
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
                                ]
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
                                ]
                            })(<InputNumber style={{width: '100%'}} min={1} max={50}/>)}
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
            newAssModal: false,
            redirecting: false,
            isError: false
        }

        this.fetchData = this.fetchData.bind(this);
        this.asyncForEach = this.asyncForEach.bind(this);
        this.openNewAssModal = this.openNewAssModal.bind(this);
        this.closeNewAddModal = this.closeNewAssModal.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    openNewAssModal() {
        this.setState({newAssModal: true})
    }

    closeNewAssModal() {
        this.setState({newAssModal: false})
    }

    fetchData() {
        this.setState({isLoading: true});
        AssignmentService.getListAssByCourse(this.props.courseId || 2)
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
            },
            {
                title: 'Delete',
                key: 'delete',
                render: (record) => {
                    if (record.submitted === '0') {
                        return (
                            <Button>Delete</Button>
                        )
                    }
                    return ''
                }
            }
        ]
        return (
            <Spin spinning={this.state.isLoading}>
                <Button type="primary" onClick={this.openNewAssModal}>
                    <Icon type="plus" />Add new Assignment
                </Button>

                <Modal
                    title="Add New Assignment"
                    style={{minWidth: '430px'}}
                    width="50%"
                    visible={this.state.newAssModal}
                    onCancel={this.closeNewAddModal}
                    footer={null}>
                        <NewAssignment id={this.props.id || 2} update={this.fetchData} close={this.closeNewAddModal}/>
                </Modal>

                <Card style={{overflow: 'auto'}}>
                    <Table
                        rowKey={record => record.id}
                        columns={column}
                        dataSource={this.state.listAss}
                        style={{minWidth: '700px'}}
                        pagination={{pageSize: 10}}/>
                </Card>

                <AssignmentDetailComponent id={"CO-2_AS-1"}/>
            </Spin>
        )
    }
}

export default AssignmentComponent;