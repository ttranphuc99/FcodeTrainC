import React from 'react'
import AssignmentService from '../../../service/AssignmentService';
import { Typography, Divider, Card, Button, Form, Upload, Icon, Modal, notification, message } from 'antd';
import {Link} from 'react-router-dom';
import WorkService from '../../../service/WorkService';

class UploadComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assignmentId: this.props.assignmentId,
            file: null,
            isError: true,
            fileList: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.normFile = this.normFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.fileList.length === 0 || this.state.list === null) {
            this.setState({isError: true});
        } else {
            WorkService.uploadFile(this.state.file, this.state.assignmentId)
            .then(response => {
                if (response.status === 200) {
                    notification.success({
                        message: 'Notification',
                        description: 'Submit successfully!',
                        top: 70,
                        placement: 'topRight',
                    });
                    this.props.closeModal();
                    this.props.reload();
                    this.destroy();
                } else {
                    return response.text();
                }
            }).then(data => {
                if (data != null) {
                    notification.error({
                        message: 'Error',
                        description: data,
                        top: 70,
                        placement: 'topRight',
                    })
                }
            })
        }
    };

    normFile = e => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    beforeUpload(file) {
        message.config({top: 100});

        const isJpgOrPng = file.type === 'text/x-csrc' || file.type === 'application/zip' || file.type === 'application/vnd.rar';

        if (!isJpgOrPng) {
            message.error('You can only upload text or compressed file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
          message.error('File must smaller than 10MB!');
        }

        if (isJpgOrPng && isLt2M) {
            this.setState({isError: false})
        } else {
            this.setState({isError: true});
        }

        return isJpgOrPng && isLt2M;
    }

    uploadFile(file) {
        this.setState({
            file: file,
            fileList: [
                file
            ]
        });
    }

    destroy() {
        this.setState({
            file: null,
            fileList: []
        })
    }

    customReq({ onSuccess, onError, file }) {
        setTimeout(() => {
            onSuccess("ok");
          }, 100);
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Upload">
                    <Upload 
                            name="file" 
                            action={this.uploadFile}
                            multiple={false}
                            beforeUpload={this.beforeUpload}
                            customRequest={this.customReq}
                            fileList={this.state.fileList}
                            >
                            <Button>
                                <Icon type="upload"/> Click to upload
                            </Button>
                        </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit" disabled={this.state.isError}>
                    Submit
                </Button>
                </Form.Item>
            </Form>
        );
    }

}

class MemberAssignmentDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            redirect: false,
            isError: false,
            assignment: null,
            submitModal: false,
            submitQuantity: 0,
            isReject: false
        }

        this.openSubmitModal = this.openSubmitModal.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.closeSubmitModal = this.closeSubmitModal.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    openSubmitModal() {
        this.setState({submitModal: true})
    }

    closeSubmitModal() {
        this.setState({submitModal: false})
        if (this.refs.upload !== undefined) {
            this.refs.upload.destroy();
        }
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
                    isError: true
                })
            }
        }).then(data => {
            if (data != null) {
                console.log(data);
                this.setState({assignment: data})
            }
        })

        WorkService.checkRejectStatus(this.props.match.params.id)
        .then(response => {
            if (response.status === 200) {
                this.setState({isReject: false});
            } else if (response.status === 400) {
                this.setState({isReject: true});
            }
        })

        WorkService.getSubmitQuantity(this.props.match.params.id)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                localStorage.setItem('loggedIn', false);
                this.setState({ redirecting: true });
            } else {
                this.setState({
                    isError: true
                })
            }
        }).then(data => {
            if (data != null) {
                this.setState({submitQuantity: data})
            }
            this.setState({isLoading: false})
        })
    }

    render() {
        const { Title, Paragraph, Text } = Typography;

        return (
            <Card>
            {this.state.assignment !== null &&
                <div>
                <Button>
                    <Link to={'/member/assignment/course/' + this.state.assignment.course.id}>Back</Link>
                </Button>
                <Typography>
                    <Title style={{textAlign: 'center'}}>{this.state.assignment.title}</Title>
                    
                    <Divider/>

                    <Paragraph>
                        <div dangerouslySetInnerHTML={{ __html: this.state.assignment.content }} />
                    </Paragraph>

                    <Divider/>

                    <Text>
                        Creator: {this.state.assignment.creatorName} - @{this.state.assignment.creatorUsername}<br/>
                        Mark: {this.state.assignment.mark}<br/>
                        Submit quantity: {this.state.assignment.submitQuantity}<br/>
                        Submit Remainder: {this.state.assignment.submitQuantity - this.state.submitQuantity}
                    </Text>

                </Typography>

                {this.state.assignment.submitQuantity - this.state.submitQuantity > 0 &&
                    !this.state.isReject && <Button onClick={this.openSubmitModal}>Submit</Button>}

                <Modal
                    title="Submit Work"
                    style={{minWidth: '430px'}}
                    width="50%"
                    visible={this.state.submitModal}
                    onCancel={this.closeSubmitModal}
                    footer={null}>
                        <UploadComponent 
                            assignmentId={this.props.match.params.id}
                            closeModal={this.closeSubmitModal}
                            reload={this.fetchData}
                            ref="upload"/>
                </Modal>
                </div>
            }
            </Card>
        )
    }
}

export default MemberAssignmentDetailComponent
