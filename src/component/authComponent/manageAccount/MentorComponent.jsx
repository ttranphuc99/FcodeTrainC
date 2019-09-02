import React from 'react';
import { Form, Spin, Button, Icon, Modal, Card, Table, Input, notification, Select } from 'antd';
import { Redirect } from 'react-router-dom';
import AccountService from '../../../service/AccountService';
import LoginService from '../../../service/LoginService';
import UniversityCourseService from '../../../service/UniversityCourseService';
import ProfileDetailComponent from './ProfileDetailComponent';

class AddNewMentorComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            course: []
        }

        this.isUsernameExisted = this.isUsernameExisted.bind(this);
        this.getListCourse = this.getListCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getListCourse();
    }

    async isUsernameExisted(rule, value, callback) {
        if (value && value !== "") {
            let result = await AccountService.isUsernameExisted(value);
            if (!result) {
                callback();
            } else {
                callback(new Error(value + ' is existed!'));
            }
        } else {
            callback();
        }
    }

    getListCourse() {
        this.setState({ isLoading: true });
        UniversityCourseService.getListCourse()
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
            }
        }).then(data => {
            if (data !== null) {
                this.setState({ course: data, isLoading: false });
            } else {
                this.props.closeModal();
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AccountService.newAccount(values, 3)
                .then(response => {
                    if (response.status === 201) {
                        notification.success({
                            message: 'Notification',
                            description: 'Add successfully!',
                            top: 70,
                            placement: 'topRight',
                        });
                        this.props.closeModal();
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
        const {Option} = Select;
        const listCourse = this.state.course.map((course) => {
            return <Option key={course.id} value={course.id}>{course.name}</Option>
        });

        return (
            <Spin spinning={this.state.isLoading}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Username" hasFeedback>
                        {getFieldDecorator('username', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input username'
                                },
                                {
                                    validator: this.isUsernameExisted
                                },
                                {
                                    pattern: new RegExp("^[a-zA-Z0-9._]+$"),
                                    message: "Contains only letters, number, '.' and _"
                                }, 
                                {
                                    max: 45,
                                    message: 'Maximum 50 characters'
                                }
                            ]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="Fullname" hasFeedback>
                        {getFieldDecorator('fullname', {
                            rules: [
                                {
                                    pattern: new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"),
                                    message: "Not contains special chacracter"
                                },
                                {
                                    max: 50,
                                    message: 'Maximum 50 characters'
                                }
                            ]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="University Course" hasFeedback>
                        {getFieldDecorator('universityCourse', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: "Please choose university course"
                                }
                            ]
                        })(
                            <Select placeholder="Select university course">
                                {listCourse}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
} 

const AddNewMentor = Form.create({})(AddNewMentorComponent); 

class MentorComponent extends React.Component {
    columns = [
        {
            title: 'ID',
            key: 'id',
            sorter: true,
            render: record => {
                return <Button 
                    style={{padding: '0'}}
                    type="link" 
                    onClick={() => this.showDetailModal(record.username)}
                >{record.id}</Button>
            }
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            sorter: true
        },
        {
            title: 'Fullname',
            key: 'fullname',
            dataIndex: 'fullname',
            sorter: true
        },
        {
            title: 'Course',
            key: 'course',
            sorter: true,
            render: record => {
                if (record.universityCourse) {
                    return <span>{record.universityCourse.name}</span>
                }
                return '';
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: record => {
                if (record.username === LoginService.getUsername()) return ''
                return (
                    <div>
                        <Button type="danger" onClick={() => this.showConfirm(record.id, record.name)}>Ban</Button>
                    </div>
                )
            }
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            redirecting: false,
            isError: false,
            isLoading: false,
            newModalVisible: false,
            firstRenderNewModal: true,
            detailModalVisible: false,
            confirmLoading: false,
            data: []
        }

        this.getListAccount = this.getListAccount.bind(this);
        this.finishLoadNewMentor = this.finishLoadNewMentor.bind(this);
        this.loadNewMentor = this.loadNewMentor.bind(this);
        this.showDetailModal = this.showDetailModal.bind(this);
        this.showNewModal = this.showNewModal.bind(this);
        this.closeDetailModal = this.closeDetailModal.bind(this);
        this.closeNewModal = this.closeNewModal.bind(this);
        this.showNotFound = this.showNotFound.bind(this);
    }

    componentWillMount() {
        this.getListAccount();
    }

    getListAccount() {
        this.setState({ isLoading: true })
        AccountService.getListAccountByRole(3)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                localStorage.setItem('loggedIn', false);
                this.setState({ redirecting: true });
            } else {
                this.setState({ isError: true, error: response });
            }
        }).then(json => {
            if (json != null) {
                this.setState({
                    isLoading: false,
                    data: json
                })
            }
        }).catch((err) => {
            this.setState({ isError: true, error: err });
        });
    }

    showNewModal() {
        this.setState({ newModalVisible: true });
        if (this.state.firstRenderNewModal) {
            this.setState({ firstRenderNewModal: false })
        } else {
            this.addNewMentor.getListCourse();
        }
    }

    async showDetailModal(username) {
        await this.setState({ detailModalVisible: true, detailUsername: username });
        this.refs.profileDetail.fetchData();
    }

    closeNewModal() {
        this.setState({ newModalVisible: false })
        this.getListAccount()
    }

    closeDetailModal() {
        this.setState({ detailModalVisible: false })
        this.getListAccount()
    }

    loadNewMentor() {
        this.setState({ confirmLoading: true })
        this.getListAccount()
    }

    finishLoadNewMentor() {
        this.setState({ confirmLoading: false })
        this.getListAccount()
    }

    showNotFound() {
        notification.error({
            message: 'Error',
            description: "Not found user " + this.state.detailUsername,
            top: 70,
            placement: 'topRight',
        })
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>
        return (
            <Spin spinning={this.state.isLoading}>
                <Button type="primary" onClick={this.showNewModal}>
                    <Icon type="plus" />Insert Mentor
                </Button>

                <Modal 
                    title="Insert mentor"
                    visible={this.state.newModalVisible}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.closeNewModal}
                    footer={null}
                >
                    <AddNewMentor 
                        wrappedComponentRef={(inst) => this.addNewMentor = inst}
                        closeModal={this.closeNewModal} 
                        updateData={this.fetchData} 
                        load={this.state.loadNewMentor}
                        finish={this.state.finishLoadNewMentor}/>
                </Modal>

                <Modal 
                    title="Mentor Detail"
                    visible={this.state.detailModalVisible}
                    onCancel={this.closeDetailModal}
                    footer={null}
                >
                    <ProfileDetailComponent 
                        ref="profileDetail"
                        username={this.state.detailUsername} 
                        isAuth={true}
                        notFound={this.showNotFound}/>
                </Modal>

                <Card style={{overflow: 'auto'}}>
                    <Table 
                        rowKey={record => record.id} 
                        columns={this.columns} 
                        dataSource={this.state.data} 
                        style={{minWidth: '700px'}} />
                </Card>
            </Spin>
        )
    }
}

export default MentorComponent;