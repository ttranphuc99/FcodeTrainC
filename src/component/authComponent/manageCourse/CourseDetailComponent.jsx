import React from 'react'
import { Redirect, Link } from 'react-router-dom';
import { Form, Row, Col, Input, Select, Button, notification, Spin, Icon, Card, Table, Tag, Modal, AutoComplete, Descriptions, Divider } from 'antd';
import CourseService from '../../../service/CourseService';
import AccountCourseService from '../../../service/AccountCourseService';
import WorkService from '../../../service/WorkService';

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
            isLoading: false,
            listAccFull: [],
            listAcc: [],
            listAccAvai: [],
            redirecting: false,
            isError: false,
            visibleAddModal: false,
            isSubmitting: false,
            currentAcc: {
                id: -1,
                fullname: 'Example',
                universityCourse: {name: 'Test'}
            }
        }

        this.fetchData = this.fetchData.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSuggestion = this.getSuggestion.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.selectSuggest = this.selectSuggest.bind(this);
        this.asyncForEach = this.asyncForEach.bind(this);
        this.banAccount = this.banAccount.bind(this);
        this.activeAccount = this.activeAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({isLoading: true});
        AccountCourseService.getListAccFromCourse(this.props.id)
        .then(response => {
            if (response.status === 200) {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    localStorage.setItem('loggedIn', false);
                    this.setState({ redirecting: true });
                } else {
                    this.setState({ isError: true, error: response });
                }
            }
        }).then(json => {
            if (json != null) {
                const start = async(data) => {
                    await this.asyncForEach(data, async(row) => {			
                        let count = await WorkService.countWork(row.id.account.username, this.props.id)
                                    .then(response => {
                                        if (response.status === 200) {
                                            return response.text();
                                        } else {
                                            return '-1';
                                        }
                                    })
                        row['countWork'] = parseInt(count);
                    })	
                    return data;
                }
                return start(json);
            }
        }).then(data => {
            if (data != null) {
                this.setState({listAcc: data});
            }
            this.setState({ isLoading: false });
        }).catch(err => {
            this.setState({ isError: true, error: err, isLoading: false });
        })
    }

    async asyncForEach(array, callback) {	
        for (let index = 0; index < array.length; index++) {	
          await callback(array[index], index, array);	
        }	
    }

    openAddModal() {
        this.setState({visibleAddModal: true});
    }

    closeAddModal() {
        this.setState({visibleAddModal: false});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AccountCourseService.addNew(values.username, this.props.id)
                .then(response => {
                    if (response.status === 201) {
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

    getSuggestion(username) {
        if (username.length === 0) {
            this.setState({listAccAvai: []});
        } else {
            AccountCourseService.getAvaiAcc4Course(username, this.props.id)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            }).then(data => {
                if (data != null) {
                    let value = [];
                    data.forEach((record, index, data) => {
                        value.push(record.username);
                    })
                    this.setState({listAccAvai: value, listAccFull: data});
                }
            })
        }
    }

    async checkUsername(rule, value, callback) {
        if (value && value !== "") {      
            if (this.state.listAccAvai.length === 1) {
                this.props.form.setFieldsValue({
                    username: this.state.currentAcc.username
                });
                callback();
                
            } else {
                callback(new Error('Not found username ' + value));
            }
        } else {
            callback();
        }
    }

    selectSuggest(value) {
        this.setState({listAccAvai: [value]});
        this.state.listAccFull.forEach((record) => {
            if (record.username === value) {
                this.setState({currentAcc: record});
            }
        })
    }

    async refresh(username, status) {
        let list = this.state.listAcc;
        let index = list.findIndex((row) => row.id.account.username === username);

        if (status > 0) {
            list[index].status = status;

            let countWork = await WorkService.countWork(list[index].id.account.username, this.props.id)
                            .then(response => {
                                if (response.status === 200) {
                                    return response.text();
                                } else {
                                    return '-1';
                                }
                            })
            list['countWork'] = parseInt(countWork);
        } else {
            list.splice(index, 1);
        }
        this.setState({listAcc: list});
    }

    banAccount(username, name) {
        Modal.confirm({
            title: 'Confirm',
            content: 'Do you want to ban account: @' +username+ ' with Name: ' + name,
            okText: 'Ban',
            cancelText: 'Cancel',
            onOk: () => {
                AccountCourseService.changeStatus(username, this.props.id, 0)
                .then(response => {
                    if (response.status === 200) {
                        notification.success({
                            message: 'Notification',
                            description: 'Ban successfully!',
                            top: 70,
                            placement: 'topRight',
                        })

                        this.refresh(username, 0);
                    } else {
                        notification.error({
                            message: 'Error',
                            description: "Update failed",
                            top: 70,
                            placement: 'topRight',
                        })
                    }
                })
            }
        })
    }

    activeAccount(username, name) {
        Modal.confirm({
            title: 'Confirm',
            content: 'Do you want to active account: @' +username+ ' with Name: ' + name,
            okText: 'Active',
            cancelText: 'Cancel',
            onOk: () => {
                AccountCourseService.changeStatus(username, this.props.id, 1)
                .then(response => {
                    if (response.status === 200) {
                        notification.success({
                            message: 'Notification',
                            description: 'Active successfully!',
                            top: 70,
                            placement: 'topRight',
                        })

                        this.refresh(username, 1);
                    } else {
                        notification.error({
                            message: 'Error',
                            description: "Update failed",
                            top: 70,
                            placement: 'topRight',
                        })
                    }
                })
            }
        })
    }

    deleteAccount(username, name) {
        Modal.confirm({
            title: 'Confirm',
            content: 'Do you want to delete account: @' +username+ ' with Name: ' + name,
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: () => {
                AccountCourseService.delete(username, this.props.id)
                .then(response => {
                    if (response.status === 200) {
                        notification.success({
                            message: 'Notification',
                            description: 'Active successfully!',
                            top: 70,
                            placement: 'topRight',
                        })

                        this.refresh(username, -1);
                    } else {
                        notification.error({
                            message: 'Error',
                            description: "Delete failed",
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

        const column = [
            {
                title: 'Username',
                key: 'username',
                render: record => {
                    return record.id.account.username;
                },
                width: '20%'
            },
            {
                title: 'Fullname',
                key: 'fullname',
                render: record => {
                    return record.id.account.fullname;
                },
                width: '30%'
            }, 
            {
                title: 'Course',
                key: 'course',
                render: record => {
                    return record.id.account.universityCourse.name;
                },
                width: "15%"
            },
            {
                title: 'Status',
                key: 'status',
                render: record => {
                    if (record.status === 1) {
                        return <Tag color="blue">Active</Tag>
                    }
                    return <Tag color="red">Ban</Tag>
                },
                width: '15%',
                align: 'center'
            },
            {
                title: 'Ban',
                key: 'ban',
                render: (record) => {
                    if (record.status === 1) {
                        if (record.countWork < 0) {
                            return ''
                        } else if (record.countWork === 0) {
                            return <Button type="danger" onClick={() => this.deleteAccount(record.id.account.username, record.id.account.fullname)}>Delete</Button>
                        } else {
                            return <Button type="danger" onClick={() => this.banAccount(record.id.account.username, record.id.account.fullname)} ghost>Ban</Button>
                        }
                    } else if (record.id.account.status === 1) {
                        return <Button type="primary" onClick={() => this.activeAccount(record.id.account.username, record.id.account.fullname)}>Active</Button>
                    } else {
                        return ''
                    }
                },
                align: 'center'
            }
        ]
        const {getFieldDecorator} = this.props.form;
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

        return(
            <Spin spinning={this.state.isLoading}>
                <Button onClick={this.openAddModal}>
                    <Icon type="plus" />Add member
                </Button>

                <Modal
                    title="Add Member"
                    visible={this.state.visibleAddModal}
                    onCancel={this.closeAddModal}
                    footer={[
                        <Button 
                            key="back" 
                            onClick={this.closeAddModal} 
                            type="danger"
                        >
                            Cancel
                        </Button>,
                        <Button 
                            key="submit" 
                            onClick={this.handleSubmit} 
                            loading={this.state.isSubmitting} 
                            type="primary"
                        >
                            Add
                        </Button>
                    ]}
                >
                    <Form {...formItemLayout} >
                        <Form.Item label="Username">
                            {getFieldDecorator('username', {
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input ..."
                                    },
                                    {validator: this.checkUsername}
                                ]
                            })(
                                <AutoComplete
                                    dataSource={this.state.listAccAvai}
                                    onSelect={this.selectSuggest}
                                    onSearch={this.getSuggestion}
                                    placeholder="Input username"
                                />
                            )}
                        </Form.Item>
                    </Form>
                    {this.state.currentAcc.id !== -1 &&
                        <div>
                            <Divider/>
                            <Descriptions title={"Profile ID:" + this.state.currentAcc.id}>
                                <Descriptions.Item label="Fullname">{this.state.currentAcc.fullname}</Descriptions.Item>
                                <Descriptions.Item label="Course">{this.state.currentAcc.universityCourse.name}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    }
                </Modal>

                <Card style={{overflow: 'auto'}}>
                    <Table
                        rowKey={record => record.id.account.id + record.id.course.id}
                        pagination={{pageSize: 50}}
                        columns={column}
                        dataSource={this.state.listAcc}
                        scroll={{y: 240}}
                        />
                </Card>
            </Spin>
        )
    }
}

const AccountInCourse = Form.create({})(AccountInCourseComponent);

class CourseDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a : ''
        }
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
        return <Redirect to='/manageCourse'/>
    }

    render() {
        return(
            <div>
                <Button>
                    <Link to='/manageCourse'>Back</Link>
                </Button>
                <Card>
                    <CourseInfo id={this.props.match.params.id}/>
                    <Divider orientation="left">Member in Course</Divider>
                    <AccountInCourse id={this.props.match.params.id}/>
                </Card>
            </div>
        )
    }
}

export default CourseDetailComponent;
