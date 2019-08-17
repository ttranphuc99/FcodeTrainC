import React from 'react';
import {Card, CardBody, Row, Col} from 'shards-react';
import {Form, Input, Button, notification} from 'antd';
import ProfileService from '../service/ProfileService';

class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                this.props.history.push('/login');
            } else {
                this.props.history.push('/error');
            }
        }).then(data => {
            this.setState({
                account: data,
                isLoading: false
            });
        }).catch(error => this.setState({
            message: error,
            isLoading: false
        }))
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', JSON.stringify(values));
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
        const { getFieldDecorator } = this.props.form;
        const creator = this.state.account.creatorName + " - @" + this.state.account.creatorUsername;
        const regexName = "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        return (
            <div>
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
                                        message: 'Please input your Fullname!',
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
                                        initialValue: this.state.account.lastModified
                                    })(<Input disabled />)}
                                    </Form.Item>
                                </Col>

                                <Col sm="12" lg="6">
                                    <Form.Item label="Created date">
                                        {getFieldDecorator('createdDate', {
                                            rules: [
                                            ],
                                            initialValue: this.state.account.dateCreated
                                        })(<Input disabled />)}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const HomeComponent = Form.create({ name: 'profile' })(UpdateProfile);

export default HomeComponent;
