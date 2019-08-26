import React from 'react';
import { Spin, Icon, Button, Modal, Table, Form, Input, notification } from 'antd';
import { Card } from 'shards-react';
import UniversityCourseService from '../service/UniversityCourseService';

class UniversityCourseDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            isLoading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.isCourseNameExisted = this.isCourseNameExisted.bind(this);
    }

    componentDidMount() {
        this.fetchData(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.forceUpdate();
            this.fetchData(this.props.id);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                UniversityCourseService.updateCourse(values, this.props.id)
                .then((response) => {
                    if (response.status === 200) {
                        this.props.updateData();
                        notification.success({
                            message: 'Notification',
                            description: 'Update course ID ' +this.props.id+ ' successfully!',
                            top: 70,
                            placement: 'topRight',
                        });
                    } else {
                        
                        notification.error({
                            message: 'Error',
                            description: response.message,
                            top: 70,
                            placement: 'topRight',
                        });
                    }
                })
            }
        })
    }

    fetchData(id) {
        this.setState({ isLoading: true });
        UniversityCourseService.getCourseById(id)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                notification.error({
                    message: 'Error',
                    description: response.message,
                    top: 70,
                    placement: 'topRight',
                });
                this.setState({ isLoading: false });
                this.props.updateData();
            }
        }).then(data => {
            if (data != null) {
                this.setState({
                    course: data,
                    isLoading: false
                });
                this.props.form.setFieldsValue({
                    name: data.name
                })
            } else {

            }
        })
    }

    isCourseNameExisted(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            UniversityCourseService.getCourseByName(value)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 404) {
                    callback();
                } else {
                    callback([new Error("Error")]);
                }
            }).then(data => {
                if (data != null) {
                    if (data.id === this.props.id) {
                        callback();
                    } else {
                        callback([new Error(value + " is existed!")]);
                    }
                } else {
                    return;
                }
            })
        }
    }

    getModifier() {
        if (this.state.course != null) {
            if (this.state.course.modifierName) {
                return this.state.course.modifierName + ' - @' + this.state.course.modifierUsername
            }
        }
        
        return '';
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };

        const modifier = this.getModifier();

        return (
            <Spin spinning={this.state.isLoading}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="ID">
                        {getFieldDecorator('id', {
                            rules: [],
                            initialValue: this.state.course.id || ''
                        })(<Input disabled />)}
                    </Form.Item>

                    <Form.Item label="Name" hasFeedback>
                        {getFieldDecorator('name', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input name!'
                                },
                                {
                                    validator: this.isCourseNameExisted
                                },
                            ],
                            initialValue: this.state.course.name || ''
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="Creator">
                        {getFieldDecorator('creator', {
                            rules: [],
                            initialValue: this.state.course.creatorName + ' - @' + this.state.course.creatorUsername || ''
                        })(<Input disabled />)}
                    </Form.Item>

                    <Form.Item label="Created Date">
                        {getFieldDecorator('createdDate', {
                            rules: [],
                            initialValue: this.state.course.dateCreated || ''
                        })(<Input disabled />)}
                    </Form.Item>

                    <Form.Item label="Last Editor">
                        {getFieldDecorator('modifierName', {
                            rules: [],
                            initialValue: modifier
                        })(<Input disabled />)}
                    </Form.Item>

                    <Form.Item label="Modified Date">
                        {getFieldDecorator('modifierName', {
                            rules: [],
                            initialValue: this.state.course.lastModified || ''
                        })(<Input disabled />)}
                    </Form.Item>

                    <Form.Item style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
}

const UniversityCourseDetail = Form.create({})(UniversityCourseDetailComponent);

class NewUniversityCourseComponent extends React.Component {
    constructor(props) {
        super(props);

        this.addNewCourse = this.addNewCourse.bind(this);
    }

    addNewCourse(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({confirmLoading: true});
                UniversityCourseService.addNewCourse(values)
                .then((response => {

                    console.log(response);
                    if (response.status === 201) {
                        notification.success({
                            message: 'Notification',
                            description: 'Add successfully!',
                            top: 70,
                            placement: 'topRight',
                        });
                        this.props.closeModal();
                        this.props.updateData();
                        this.props.form.resetFields();
                    } else {
                        notification.error({
                            message: 'Error',
                            description: response.message,
                            top: 70,
                            placement: 'topRight',
                        })
                    }
                    this.setState({confirmLoading: false});
                }));
            }
        });
    }

    isCourseNameExisted(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            UniversityCourseService.getCourseByName(value)
            .then((response) => {
                if (response.status === 200) {
                    callback([new Error(value + " is existed!")]);
                } else if (response.status === 404) {
                    callback();
                } else {
                    callback([new Error("Error")]);
                }
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.addNewCourse}>
                <Form.Item 
                    label="Name" 
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input name!'
                            },
                            {
                                validator: this.isCourseNameExisted
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Add</Button>
                </Form.Item>
            </Form>
        )
    }
}

const NewUniversityCourse = Form.create({})(NewUniversityCourseComponent);

class UniversityCourseComponent extends React.Component {
    columns = [
        {
            title: 'ID',
            key: 'id',
            render: record => {
                return <Button 
                    style={{padding: '0'}}
                    type="link" 
                    onClick={() => this.showDetail(record.id)}
                >{record.id}</Button>
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Creator',
            key: 'creator',
            render: record => {
                return <span>{record.creatorName} - @{record.creatorUsername}</span>
            }
        },
        {
            title: 'Last Editor',
            key: 'lastEditor',
            render: record => {
                if (record.modifierName) {
                    return <span>{record.modifierName} - @{record.modifierUsername}</span>
                }
                return '';
            }
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Action',
            key: 'action',
            render: record => {
                if (record.quantity > 0) return ''
                return (
                    <div>
                        <Button type="danger" onClick={() => this.showConfirm(record.id, record.name)}>Delete</Button>
                    </div>
                )
            }
        }
    ];
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            modalVisible: false,
            confirmLoading: false,
            dataSrc: [],
            updateModalVisible: false
        };

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
    }

    showConfirm(id, name) {
        const { confirm } = Modal;

        confirm({
            title: 'Delete Confirm',
            content: 'Do you want to delete course ' + name + ' ?',
            onOk: () => this.deleteCourse(id),
            onCancel() {},
        });
    }

    showDetail(id) {
        this.showUpdateModal();
        this.setState({ detailID: id });
    }

    deleteCourse(id) {
        UniversityCourseService.deleteCourse(id)
        .then(response => {
            if (response.status === 200) {
                this.fetchData();

                notification.success({
                    message: 'Notification',
                    description: 'Delete course ID ' +id+ ' successfully!',
                    top: 70,
                    placement: 'topRight',
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Delete course ID ' +id+ ' failed!',
                    top: 70,
                    placement: 'topRight',
                });
            }
        })
        // console.log('del ', id);
    }

    componentWillMount() {
        this.fetchData();
    }

    showModal() {
        this.setState({
            modalVisible: true
        })
    }

    showUpdateModal() {
        this.setState({ updateModalVisible: true })
    }

    closeModal() {
        this.setState({
            modalVisible: false
        })
    }

    closeUpdateModal() {
        this.setState({ updateModalVisible: false })
    }

    fetchData() {
        this.setState({isLoading: true});
        UniversityCourseService.getListCourse()
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                this.props.history.push('/login');
            } else {
                this.props.history.push('/error');
            }
        }).then(json => {
            const start = async(data) => {
                await this.asyncForEach(data, async(row) => {
                    row["key"] = row.id;
                    let response = await UniversityCourseService.countAccFromCourse(row.id);
                    
                    if (response.status === 200) {
                        let text = await response.text();
                        row["quantity"] = text
                    }
                })
                return data;
            }
            
            return start(json);

        }).then(json => 
            this.setState({
                isLoading: false,
                dataSrc: json
            })
        );
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
    }

    render() {
        return (
            <Spin spinning={this.state.isLoading}>
                <Button type="primary" onClick={this.showModal}>
                    <Icon type="plus" />Insert university course
                </Button>

                <Modal 
                    title="Insert university course"
                    visible={this.state.modalVisible}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.closeModal}
                    footer={null}
                >
                    <NewUniversityCourse closeModal={this.closeModal} updateData={this.fetchData} />
                </Modal>

                <Modal 
                    title="University Course Detail"
                    visible={this.state.updateModalVisible}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.closeUpdateModal}
                    footer={null}
                >
                    <UniversityCourseDetail updateData={this.fetchData} id={this.state.detailID || 0}/>
                </Modal>

                <Card style={{overflow: 'auto'}}>
                    <Table columns={this.columns} dataSource={this.state.dataSrc} style={{minWidth: '700px'}} />
                </Card>
            </Spin>
        )
    }
}

export default UniversityCourseComponent;
