import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import {Redirect} from 'react-router-dom';
import LoginService from '../service/LoginService';
import '../stylesheet/LoginStylesheet.css';
import "antd/dist/antd.css";

class LoginComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};
	}

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            if (values.remember) {
              localStorage.setItem('username', values.username);
            }
            LoginService.login(values)
                .then((response) => {
					if (response.status === 200) {
						localStorage.setItem('loggedIn', true);
						this.setState({redirect: true});
					} else if (response.status === 401) {
						this.setState({
							errorMess: "Incorrect username or password!"
						});
					}
                }).catch((e) => {
                    console.log(e);
                });
          }
        });
    };
      
    render() {
		if (this.state.redirect) return <Redirect to='/home'/>
        let storedUsername = localStorage.getItem('username') || '';
        const { getFieldDecorator } = this.props.form;
        return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				{ this.state.errorMess && <Alert message={this.state.errorMess || ''} type="error" showIcon />}
				<Form.Item>
				{getFieldDecorator('username', {
					rules: [{ required: true, message: 'Please input your username!' }],
					initialValue: storedUsername
				})(
					<Input
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="Username"
					/>,
				)}
				</Form.Item>
				<Form.Item>
				{getFieldDecorator('password', {
					rules: [{ required: true, message: 'Please input your Password!' }],
				})(
					<Input
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="password"
					placeholder="Password"
					/>,
				)}
				</Form.Item>
				<Form.Item>
				{getFieldDecorator('remember', {
					valuePropName: 'checked',
					initialValue: true,
				})(<Checkbox>Remember username</Checkbox>)}
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
				</Form.Item>
			</Form>
		);
    }
}

export default Form.create({ name: 'normal_login' })(LoginComponent);
