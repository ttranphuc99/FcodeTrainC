import React from 'react';
import { Redirect } from 'react-router-dom';
import {Card, CardBody, Row, Col} from 'shards-react';
import {Form, Input, Button, notification, Spin} from 'antd';
import ProfileService from '../service/ProfileService';
import DateConvertService from '../service/DateConvertService';

class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirecting: false,
            isError: false,
            account : [],
            message: '',
            isLoading: true
        }

        this.loadProfile = this.loadProfile.bind(this);
    }

    componentWillMount() {
        this.loadProfile();
    }

    loadProfile() {
        ProfileService.loadProfile()
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
            this.setState({
                account: data,
                isLoading: false
            });
        }).catch((err) => {
            this.setState({ isError: true, error: err });
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', JSON.stringify(values));
                this.setState({isLoading: true})
                ProfileService.updateProfile(values)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 401) {
                        this.props.history.push('/login');
                    } else {
                        notification.error({
                            message: 'Error',
                            description: 'Error code: ' + response.status,
                            top: 70,
                            placement: 'topRight',
                        })
                    }
                }).then(data => {
                    this.setState({
                        account: data,
                        isLoading: false,
                        message: 'Update successfully'
                    });

                    notification.success({
                        message: 'Notification',
                        description: 'Update profile successfully!',
                        top: 70,
                        placement: 'topRight',
                    })
                    
                    document.cookie = "fullname=" + data.fullname
                }).catch(error => {
                    this.setState({
                        message: error,
                        isLoading: false
                    })

                    notification.error({
                        message: 'Error',
                        description: error,
                        top: 70,
                        placement: 'topRight',
                    })
                }) 
            }
        });
    };

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const { getFieldDecorator } = this.props.form;
        const creator = this.state.account.creatorName + " - @" + this.state.account.creatorUsername;
        const regexName = "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        return (
            <Spin spinning={this.state.isLoading}>
                <Card style={{padding: '0 1.5%'}}>
                    <CardBody>
                        <Form onSubmit={this.handleSubmit}>  
                            <Form.Item hasFeedback label="Fullname">
                            {getFieldDecorator('fullname', {
                                rules: [
                                    {
                                        type: 'string',
                                        message: 'Maximum 50 characters. Not contain special character.'
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Fullname!',
                                    },
                                    {
                                        max: 50,
                                        message: 'Maximum 50 characters. Not contain special character.'
                                    },
                                    {
                                        pattern: new RegExp(regexName),
                                        message: 'Not contain special character'
                                    }
                                ],
                                initialValue: this.state.account.fullname
                            })(<Input/>)}
                            </Form.Item>

                            <Form.Item hasFeedback label="Description">
                            {getFieldDecorator('description', {
                                rules: [
                                    {
                                        type: 'string',
                                        message: 'Maximum 255 characters. Not contain special character.'
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Description!',
                                    },
                                    {
                                        max: 255,
                                        message: 'Maximum 255 characters. Not contain special character.'
                                    }
                                ],
                                initialValue: this.state.account.description
                            })(<Input/>)}
                            </Form.Item>

                            <Form.Item label="University Course">
                            {getFieldDecorator('universityCourse', {
                                rules: [
                                ],
                                initialValue: this.state.account.universityCourse ? this.state.account.universityCourse.name : ''
                            })(<Input disabled />)}
                            </Form.Item>

                            <Form.Item label="Creator">
                            {getFieldDecorator('creator', {
                                rules: [
                                ],
                                initialValue: creator
                            })(<Input disabled />)}
                            </Form.Item>

                            <Row>
                                <Col sm="12" lg="6">
                                    <Form.Item label="Last modified">
                                    {getFieldDecorator('lastModified', {
                                        rules: [
                                        ],
                                        initialValue: DateConvertService.convert(this.state.account.lastModified)
                                    })(<Input disabled />)}
                                    </Form.Item>
                                </Col>

                                <Col sm="12" lg="6">
                                    <Form.Item label="Created date">
                                        {getFieldDecorator('createdDate', {
                                            rules: [
                                            ],
                                            initialValue: DateConvertService.convert(this.state.account.dateCreated)
                                        })(<Input disabled />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col style={{display: 'flex', justifyContent: 'center'}}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Update
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Spin>
        )
    }
}

const ProfileComponent = Form.create({ name: 'profile' })(UpdateProfile);

export default ProfileComponent;
