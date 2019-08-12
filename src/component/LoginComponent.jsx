import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import LoginService from '../service/LoginService';
import '../stylesheet/LoginStylesheet.css';
import "antd/dist/antd.css";

class LoginComponent extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            if (values.remember) {
              localStorage.setItem('username', values.username);
            }
            LoginService.login(values)
                .then(() => {
                    console.log("success");
                })
                .catch((e) => {
                    console.log(e);
                });
          }
        });
    };
      
    render() {
        let storedUsername = localStorage.getItem('username') || '';
        const { getFieldDecorator } = this.props.form;
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
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
