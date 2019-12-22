import React from 'react';
import AnnouncementService from '../../../service/AnnouncementService';
import { Redirect } from 'react-router-dom';
import { Button, Spin, Table, Card, Modal, notification } from 'antd';
import NewAnnouncementComponent from '../../annoucement/NewAnnouncementComponent';
import UpdateAnnouncementComponent from '../../annoucement/UpdateAnnouncementComponent';
import AnnouncementDetailComponent from '../../annoucement/AnnouncementDetailComponent';
import DateConvertService from '../../../service/DateConvertService';

class AdminAnnouncementComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            listAnn: [],
            redirecting: false,
            isError: false,
            error: '',
            newModalVisibility: false,
            detailModalVisibility: false,
            updateModalVisibility: false,
            currentAnnId: -1,
            currentAnnIdDetail: -1
        }

        this.fetchData = this.fetchData.bind(this);
        this.showNewModal = this.showNewModal.bind(this);
        this.closeNewModal = this.closeNewModal.bind(this);
        this.showDetailModal = this.showDetailModal.bind(this);
        this.closeDetailModal = this.closeDetailModal.bind(this);
        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({isLoading: true});
        AnnouncementService.getAll()
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
                this.setState({listAnn: data, isLoading: false});
            }
        })
    }

    showNewModal() {
        this.setState({newModalVisibility: true});
    }

    closeNewModal() {
        this.setState({newModalVisibility: false});
    }

    async showDetailModal(id) {
        await this.setState({detailModalVisibility: true, currentAnnIdDetail: id});
        if (this.refs.detailComponent !== undefined) this.refs.detailComponent.fetchData();
    }

    closeDetailModal() {
        this.setState({detailModalVisibility: false});
    }

    async showUpdateModal(id) {
        await this.setState({updateModalVisibility: true, currentAnnId: id});
        if (this.form !== undefined) this.form.fetchData();
    }

    closeUpdateModal() {
        this.setState({updateModalVisibility: false});
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
                render: record => {
                    return <Button type="link" onClick={() => this.showDetailModal(record.id)}>{record.title}</Button>
                }
            },
            {
                title: 'Course',
                key: 'course',
                render: record => record.course.name
            },
            {
                title: 'Creator',
                key: 'creator',
                render: record => {
                    return <span>{record.creator.fullname} - @{record.creator.username}</span>
                }
            },
            {
                title: 'Created Time',
                key: 'createdTime',
                render: record => {
                    return <span>{DateConvertService.convert(record.createdTime)}</span>
                }
            },
            {
                title: 'Action',
                key: 'action',
                render: record => {
                    return (
                        <span>
                            <Button onClick={() => this.showUpdateModal(record.id)}>Edit</Button>
                        </span>
                    )
                },
                align: 'center'
            }
        ]

        return(
            <Spin spinning={this.state.isLoading}>
                <Card style={{overflow: 'auto'}}> 
                    <div 
                        style={{
                            width: '100%', 
                            textAlign: 'center', 
                            fontSize: '25px', 
                            fontWeight: 'bold',
                            marginBottom: '15px'
                    }}>
                        Announcement
                    </div>

                    <Button type="primary" onClick={this.showNewModal}>Add new announcement</Button>

                    <Modal
                        title="Add New Announcement"
                        style={{minWidth: '430px'}}
                        width="50%"
                        visible={this.state.newModalVisibility}
                        onCancel={this.closeNewModal}
                        footer={null}>
                            <NewAnnouncementComponent update={this.fetchData} closeModal={this.closeNewModal}/>
                    </Modal>

                    {!this.state.isLoading &&
                            <Table
                                columns={column}
                                dataSource={this.state.listAnn}
                                rowKey={record => record.id}
                                style={{minWidth: '850px'}}
                                pagination={{pageSize: 10}}
                            />
                    }

                    <Modal
                        title="Edit Announcement"
                        style={{minWidth: '430px'}}
                        width="50%"
                        visible={this.state.updateModalVisibility}
                        onCancel={this.closeUpdateModal}
                        footer={null}>
                            <UpdateAnnouncementComponent 
                                id={this.state.currentAnnId} 
                                update={this.fetchData} 
                                closeModal={this.closeUpdateModal}
                                wrappedComponentRef={(form) => this.form = form}
                            />
                    </Modal>

                    <Modal
                        title="Announcement Detail"
                        style={{minWidth: '430px'}}
                        width="50%"
                        visible={this.state.detailModalVisibility}
                        onCancel={this.closeDetailModal}
                        footer={null}>
                            <AnnouncementDetailComponent 
                                id={this.state.currentAnnIdDetail} 
                                closeModal={this.closeDetailModal}
                                ref="detailComponent"
                            />
                    </Modal>
                </Card>
            </Spin>
        )
    }
}

export default AdminAnnouncementComponent;