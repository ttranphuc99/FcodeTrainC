import React from 'react'
import { Spin, Form, Input, Button, notification, Card } from 'antd';
import LoginService from '../service/LoginService';

class ChangePasswordComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({isLoading: true});
                LoginService.changePassword(values)
                .then(response => {
                    if (response.status === 200) {
                        notification.success({
                            message: 'Notification',
                            description: 'Change password successfully!',
                            top: 70,
                            placement: 'topRight',
                        })
                        this.props.form.resetFields();
                        this.setState({isLoading: false});
                    } else {
                        notification.error({
                            message: 'Error',
                            description: 'Error',
                            top: 70,
                            placement: 'topRight',
                        });
                        this.setState({isLoading: false});
                    }
                })
            }
        })

    }

    checkPassword(rule, value, callback) {
        LoginService.checkPassword(value)
        .then(response => {
            if (response.status === 200) {
                callback();
            } else {
                callback(new Error('Wrong password'));
            }
        })
    }

    checkConfirmPassword(rule, value, callback) {
        let newPass = this.props.form.getFieldValue('newPassword');
        if (value === newPass) {
            callback();
        } else {
            callback(new Error('Confirm password is not matching!'));
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Card>
                <Spin spinning={this.state.isLoading}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="Old Password" hasFeedback>
                            {getFieldDecorator('oldPassword', {
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input ...'
                                    },
                                    {
                                        validator: this.checkPassword
                                    }
                                ]
                            })(<Input type='password'/>)}
                        </Form.Item>

                        <Form.Item label="New Password">
                            {getFieldDecorator('newPassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input ...'
                                    },
                                    {
                                        max: 20,
                                        message: 'Maximum 20 characters'
                                    },
                                    {
                                        min: 6,
                                        message: 'Minimum 6 characters'
                                    }
                                ]
                            })(<Input type='password'/>)}
                        </Form.Item>

                        <Form.Item label="Confirm Password">
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input ...'
                                    },
                                    {
                                        validator: this.checkConfirmPassword
                                    }
                                ]
                            })(<Input type='password'/>)}
                        </Form.Item>

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Change Password</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Spin>
            </Card>
        )
    }
}

export default Form.create({})(ChangePasswordComponent);