import React from 'react'
import { Spin, Descriptions, Card } from 'antd';
import WorkService from '../../../service/WorkService';

class SubmissionDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            work: {
                id: '',
                assignment: {id: ''},
                submitTime: '',
                status: 0,
                judger:{fullname: '', username: ''},
                submitQuantity: 0,
                comment: ''
            },
            isLoading: true,
            content: ''
        }

        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
            this.setState({isLoading: true});
            WorkService.getSubmissionDetail(this.props.match.params.id)
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
                console.log('data', data)
                if (data != null) {
                    this.setState({work: data});
                }
            })

            WorkService.getSubmissionContent(this.props.match.params.id)
            .then(response => {
                if (response.status === 200) {
                    return response.text();
                } else if (response.status === 401) {
                    localStorage.setItem('loggedIn', false);
                    this.setState({ redirecting: true });
                } else {
                    this.setState({ isError: true, error: response });
                }
            }).then(data => {
                if (data != null) {
                    this.setState({content: data});
                }
                this.setState({isLoading: false});
            })
    }

    render() {
        const isJudge = () => {
            if (this.state.work.judger) 
                return (
                    <div>
                        <Descriptions.Item label="Judger">{this.state.work.judger.fullname} - @{this.state.work.judger.username}</Descriptions.Item>
                        <Descriptions.Item label="Judge Time">{this.state.work.judgeTime}</Descriptions.Item>
                    </div>);
            return <div></div>;
        }

        return (
            <Card>
                <Spin spinning={this.state.isLoading}>
                    <div>
                        <Descriptions title="Submission Detail" layout="horizontal" bordered>
                            <Descriptions.Item label="ID">{this.state.work.id}</Descriptions.Item>
                            <Descriptions.Item label="Assignment ID">{this.state.work.assignment.id}</Descriptions.Item>

                            <Descriptions.Item label="Status">{this.state.work.status}</Descriptions.Item>
                            <Descriptions.Item label="Submit Time">{this.state.work.submitTime}</Descriptions.Item>

                            {isJudge}

                            <Descriptions.Item label="Submit Quantity">{this.state.work.submitQuantity}</Descriptions.Item>
                            <Descriptions.Item label="Comment">{this.state.work.comment}</Descriptions.Item>
                        </Descriptions>

                        <Descriptions layout="vertical" bordered>
                            <Descriptions.Item label="">
                                <pre>{this.state.content}</pre>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </Spin>
            </Card>
        );
    }
}

export default SubmissionDetailComponent;