import React from 'react';
import {Card, CardBody, Row, Col} from 'shards-react';
import {Form, Input} from 'antd';
import ProfileService from '../service/ProfileService';

class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account : [],
            message: null,
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const creator = this.state.account.creatorName + " - @" + this.state.account.creatorUsername;
        return (
            <Card style={{padding: '0 1.5%'}}>
                <CardBody>
                    <Form>
                        <Form.Item label="Fullname">
                        {getFieldDecorator('fullname', {
                            rules: [
                                {
                                    type: 'text',
                                    message: 'Maximum 50 characters. Not contain special character.',
                                },
                                {
                                    required: true,
                                    message: 'Please input your Fullname!',
                                },
                            ],
                            initialValue: this.state.account.fullname
                        })(<Input/>)}
                        </Form.Item>

                        <Form.Item label="Description">
                        {getFieldDecorator('description', {
                            rules: [
                                {
                                    type: 'text',
                                    message: 'Maximum 255 characters. Not contain special character.',
                                },
                                {
                                    required: true,
                                    message: 'Please input your Description!',
                                },
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
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

const HomeComponent = Form.create({ name: 'profile' })(UpdateProfile);

export default HomeComponent;
