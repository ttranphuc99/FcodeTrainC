import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Spin, Button, Icon, Card, Table, Input, Tag, Form, Modal, notification } from 'antd';
import CourseService from '../../../service/CourseService';

class NewCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            isLoading: false
        }

        this.isNameExisted = this.isNameExisted.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async isNameExisted(rule, value, callback) {
        if (value && value !== "") {
            let result = await CourseService.isCourseNameExisted(value);
            if (!result) {
                callback();
            } else {
                callback(new Error(value + ' is existed!'));
            }
        } else {
            callback();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) =>{
            if (!err) {
                CourseService.addNewCourse(values)
                .then(response => {
                    if (response.status === 201) {
                        notification.success({
                            message: 'Notification',
                            description: 'Add successfully!',
                            top: 70,
                            placement: 'topRight',
                        });
                        this.props.closeModal();
                        this.props.updateData();
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

        return(
            <Spin spinning={this.state.isLoading}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
                            ]
                        })(<Input/>)}
                    </Form.Item>

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
                                ]
                            })(<Input/>)}
                    </Form.Item>

                    <Form.Item style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
}

const NewCourse = Form.create({})(NewCourseComponent);

class ListCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            newCourseModal: false,
            redirecting: false,
            isError: false
        }

        this.showNewCourseModal = this.showNewCourseModal.bind(this);
        this.closeNewCourseModal = this.closeNewCourseModal.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {this.searchInput = node;}}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
    })

    componentWillMount() {
        this.fetchData();
    }

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    showNewCourseModal() {
        this.setState({newCourseModal: true});
    }

    closeNewCourseModal() {
        this.setState({newCourseModal: false});
    }

    fetchData() {
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
            }
            this.setState({isLoading: false});
        }).catch((err) => {
            this.setState({ isError: true, error: err });
            this.setState({isLoading: false});
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
                    return <Link to={'/manageCourse/course/' + record.id}>{record.id}</Link>
                },
                sorter: (a,b) => a.id - b.id,
                width: '10%'
            },
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                width: '35%',
                ...this.getColumnSearchProps('name')
            },
            {
                title: 'Status',
                key: 'status',
                width: '10%',
                render: record => {
                    if(record.status === 1) {
                        return <Tag color="blue">Active</Tag>
                    }
                    return <Tag color="red">Closed</Tag>
                },
                filters: [
                    {
                        text: 'Active',
                        value: 1
                    }, 
                    {
                        text: 'Closed',
                        value: 0
                    }
                ],
                onFilter: (value, record) => record.status === value
            },
            {
                title: 'Creator',
                key: 'creator',
                width: '20%',
                render: record => {
                    return record.creatorName + " - @" + record.creatorUsername;
                }
            },
            {
                title: 'Created Time',
                key: 'createdTime',
                dataIndex: 'createdTime'
            }
        ];

        return (
            <Spin spinning={this.state.isLoading}>
                <Button type="primary" onClick={this.showNewCourseModal}>
                    <Icon type="plus" />Add new course
                </Button>

                <Modal
                    title="Add new course"
                    visible={this.state.newCourseModal}
                    onCancel={this.closeNewCourseModal}
                    footer={null}>
                        <NewCourse 
                            closeModal={this.closeNewCourseModal}
                            updateData={this.fetchData}/>
                </Modal>

                <Card style={{overflow: 'auto'}}>
                    <Table
                        rowKey={record => record.id}
                        columns={column}
                        dataSource={this.state.listCourse}
                        style={{minWidth: '700px'}}
                        pagination={{pageSize: 10}}/>
                </Card>
            </Spin>
        )
    }
}

export default ListCourseComponent;
