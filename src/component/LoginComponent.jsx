import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert, message } from 'antd';
import {Redirect} from 'react-router-dom';
import LoginService from '../service/LoginService';
import '../stylesheet/LoginStylesheet.css';
import '../stylesheet/util.css';
import '../stylesheet/main.css';
import background from '../image/bg-01.jpg';
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
						console.log(response.body);
					} else if (response.status === 401) {
						message.error("Invalid username or password")
					}
                }).catch((e) => {
                    console.log(e);
                });
          }
        });
    };
      
    render() {
		if (this.state.redirect) {
			return <Redirect to='/home'/>
		} 
        let storedUsername = localStorage.getItem('username') || '';
        const { getFieldDecorator } = this.props.form;
        return (
			<div className="login-wrap">
				<div className="limiter">
					<div className="container-login100" style={{backgroundImage: "url(" +background+ ")"}}>
						<div className="wrap-login100">
							<span className="login100-form-title p-b-41">
								Login
							</span>
							<Form onSubmit={this.handleSubmit} className="login100-form validate-form p-b-33 p-t-5" style={{padding: '30px'}}>
								<div>
									<Form.Item>
										{getFieldDecorator('username', {
											rules: [{ required: true, message: 'Please input your username!' }],
											initialValue: storedUsername
										})(
											<Input
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="Username"
											className="input100 login-input-wrap"
											/>,
										)}
										</Form.Item>
								</div>
								
								
								<div>
									<Form.Item>
										{getFieldDecorator('password', {
											rules: [{ required: true, message: 'Please input your Password!' }],
										})(
											<Input
											prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
											type="password"
											placeholder="Password"
											className="input100 login-input-wrap"
											/>,
										)}
									</Form.Item>
								</div>
						
								<div>
									<Form.Item>
										{getFieldDecorator('remember', {
											valuePropName: 'checked',
											initialValue: true,
										})(<Checkbox>Remember username</Checkbox>)}
									</Form.Item>
								</div>

								<div className="container-login100-form-btn m-t-32">
									<Button type="primary" htmlType="submit" className="login100-form-btn">
										Log in
									</Button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		);
    }
}

export default Form.create({ name: 'normal_login' })(LoginComponent);
