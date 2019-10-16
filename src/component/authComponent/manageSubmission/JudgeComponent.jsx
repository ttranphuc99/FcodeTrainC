import React from 'react'
import WorkService from '../../../service/WorkService';
import { Select, Button, Input, notification, Form } from 'antd';

class JudgeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            currentStatus: this.props.status
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.setState({currentStatus: this.props.status});
        this.props.form.setFieldsValue({comment: this.props.comment})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              WorkService.judgeSubmission(this.props.submissionId, this.state.currentStatus, values.comment)
              .then(response => {
                  if (response.status === 200) {
                      notification.success({
                        message: 'Notification',
                        description: 'Judge successfully!',
                        top: 70,
                        placement: 'topRight',
                      })
                      this.props.closeModal();
                      this.props.update(this.props.submissionId, this.state.currentStatus, values.comment);
                  }
              })
            }
        });
    }

    handleChange(value) {
        console.log('Select ', value);
        this.setState({currentStatus: value})
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    <Select onChange={this.handleChange} value={this.state.currentStatus}>
                        <Option value={0}>Waiting</Option>
                        <Option value={1}>Success</Option>
                        <Option value={-1}>Wrong</Option>
                        <Option value={-2}>Run-Error</Option>
                        <Option value={-3}>Reject</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Comment">
                    {getFieldDecorator('comment', {
                    })(<Input/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Judge</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({})(JudgeComponent);