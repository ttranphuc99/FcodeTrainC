import React from 'react'
import { Redirect, Link } from 'react-router-dom';
import { Form, Spin, Button, Icon, Card, Table, Input, Row, Col, notification, InputNumber, Modal, Tag } from 'antd'
import AssignmentService from '../../../service/AssignmentService';
import WorkService from '../../../service/WorkService';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../../stylesheet/EditorStyleSheet.css';

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
                        this.props.update();
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
        this.closeConfirm = this.closeConfirm.bind(this);
        this.deleteConfirm = this.deleteConfirm.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateRecordDelete = this.updateRecordDelete.bind(this);
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
                            let complete;	

                            if (response.status === 200) {	
                                complete = await response.text();	
                                row["completed"] = complete;	
                            }

                            response = await WorkService.countWorkUnsuccessByAss(row.id);

                            if (response.status === 200) {	
                                let text = await response.text();	
                                row["submitted"] = parseInt(text) + parseInt(complete);	
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

    updateStatus(assignmentId, status) {
        let updatedList = this.state.listAss;
        let index = updatedList.findIndex((row) => row.id === assignmentId);
        
        updatedList[index].status = status;

        this.setState({listAss: updatedList});
    }

    updateRecordDelete(assignmentId) {
        let updatedList = this.state.listAss;
        let index = updatedList.findIndex((row) => row.id === assignmentId);
        
        updatedList.splice(index, 1);

        this.setState({listAss: updatedList});
    }

    closeAssignment(assignmentId) {
        AssignmentService.closeAssignment(assignmentId)
        .then(response => {
            if (response.status === 200) {
                notification.success({
                    message: 'Notification',
                    description: 'Close successfully!',
                    top: 70,
                    placement: 'topRight',
                });
                this.updateStatus(assignmentId, 0);
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

    activeAssignment(assignmentId) {
        AssignmentService.activeAssignment(assignmentId)
        .then(response => {
            if (response.status === 200) {
                notification.success({
                    message: 'Notification',
                    description: 'Active successfully!',
                    top: 70,
                    placement: 'topRight',
                });
                this.updateStatus(assignmentId, 1);
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

    deleteAssignment(assignmentId) {
        AssignmentService.deleteAssignment(assignmentId)
        .then(response => {
            if (response.status === 200) {
                notification.success({
                    message: 'Notification',
                    description: 'Delete successfully!',
                    top: 70,
                    placement: 'topRight',
                });
                this.updateRecordDelete(assignmentId);
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

    closeConfirm(record) {
        Modal.confirm({
            title: 'Confirm',
            content: 'Do you want to close assignment ID: ' + record.id,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => this.closeAssignment(record.id)
        })
    }

    activeConfirm(record) {
        Modal.confirm({
            title: 'Confirm',
            content: 'Do you want to active assignment ID: ' + record.id,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => this.activeAssignment(record.id)
        })
    }

    deleteConfirm(record) {
        Modal.confirm({
            title: 'Confirm',
            content: 'Do you want to delete assignment ID: ' + record.id,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => this.deleteAssignment(record.id)
        })
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const column = [
            {
                title: 'ID',
                key: 'id',
                render: record => {
                    return <Link to={'/manageAssignment/assignment/' + record.id}>{record.id}</Link> 
                },
                width: 150,
                fixed: 'left'
            },
            {
                title: 'Title',
                key: 'title',
                dataIndex: 'title',
                width: 300,
                fixed: 'left'
            },
            {
                title: 'Mark',
                key: 'mark',
                dataIndex: 'mark',
                width: 50,
                align: 'center'
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
                },
                width: 50,
                align: 'center'
            },
            {
                title: 'Creator',
                key: 'creator',
                render: record => {
                    return record.creatorName + " - @" + record.creatorUsername
                },
                width: 150
            },
            {
                title: 'Submitted',
                key: 'submitted',
                dataIndex: 'submitted',
                width: 50,
                align: 'center'
            },
            {
                title: 'Completed',
                key: 'completed',
                dataIndex: 'completed',
                width: 50,
                align: 'center'
            },
            {
                title: 'Close',
                key: 'close',
                render: (record) => {
                    if (record.status === 1) {
                        return (
                            <Button type="primary" onClick={() => this.closeConfirm(record)}>Close</Button>
                        )
                    }
                    return (
                        <Button onClick={() => this.activeConfirm(record)}>Active</Button>
                    )
                    
                },
                width: 75,
                align: 'center',
                fixed: 'right'
            },
            {
                title: 'Delete',
                key: 'delete',
                render: (record) => {
                    if (record.submitted === 0) {
                        return (
                            <Button type="danger" onClick={() => this.deleteConfirm(record)}>Delete</Button>
                        )
                    }
                    return ''
                },
                width: 75,
                align: 'center',
                fixed: 'right'
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
                        <NewAssignment id={this.props.courseId} update={this.fetchData} close={this.closeNewAddModal}/>
                </Modal>

                <Card style={{overflow: 'auto'}}>
                    <Table
                        rowKey={record => record.id}
                        columns={column}
                        dataSource={this.state.listAss}
                        style={{minWidth: '850px'}}
                        pagination={{pageSize: 10}}
                        scroll={{x:1150}}/>
                </Card>
            </Spin>
        )
    }
}

export default AssignmentComponent;