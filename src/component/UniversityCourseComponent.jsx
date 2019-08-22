import React from 'react';
import { Spin, Icon, Button, Modal, Table, Form, Input } from 'antd';
import { Card } from 'shards-react';
import UniversityCourseService from '../service/UniversityCourseService';

class UniversityCourseComponent extends React.Component {
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
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
            title: 'Created Time',
            dataIndex: 'dateCreated',
            key: 'dateCreated'
        },
        {
            title: 'Last Editor',
            key: 'lastEditor',
            render: record => {
                return <span>{record.modifierName} - @{record.modifierUsername}</span>
            }
        },
        {
            title: 'Last modified time',
            dataIndex: 'lastModified',
            key: 'lastModified'
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
                return <Button type="primary" onClick={() => this.deleteCourse(record.id)}>Delete</Button>
            }
        }
    ];
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            modalVisible: false,
            confirmLoading: false,
            dataSrc: []
        };

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addNewCourse = this.addNewCourse.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    deleteCourse(id) {
        UniversityCourseService.deleteCourse(id)
        .then(response => {
            if (response.status === 200) {
                this.fetchData();
            } else {
                console.log('error');
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

    closeModal() {
        this.setState({
            modalVisible: false
        })
    }

    addNewCourse(e){
        e.preventDefault();
        if (this.state.validator.validateStatus === 'success') window.alert('submit');
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

    isCourseNameExisted(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            
        }
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
                                    }
                                ]
                            })(<Input/>)}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Card>
                    <Table columns={this.columns} dataSource={this.state.dataSrc} />
                </Card>
            </Spin>
        )
    }
}

export default Form.create({name: 'universityCourse'})(UniversityCourseComponent);
