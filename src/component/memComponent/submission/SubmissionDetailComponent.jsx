import React from 'react'
import {Link} from 'react-router-dom';
import { Spin, Descriptions, Card, Button, Icon, Tag } from 'antd';
import WorkService from '../../../service/WorkService';
import DateConvertService from '../../../service/DateConvertService';

class SubmissionDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            work: {
                id: '',
                assignment: {id: '', course: {id: ''}},
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

    downloadFile(id) {
        WorkService.downloadFile('/member/work/' + id + '/file');
    }

    render() {
        const judgeName = () => {
            if (this.state.work.judger) 
                return this.state.work.judger.fullname + " - @" + this.state.work.judger.username;
            return '';
        }

        const judgeTime = () => {
            if (this.state.work.judger) return DateConvertService.convert(this.state.work.judgeTime);
            return '';
        }

        const status = () => {
            switch (this.state.work.status) {
                case 0: return <Tag color="magenta">Waiting</Tag>
                case 1: return <Tag color="blue">Success</Tag>
                case -1 : return <Tag color="gold">Wrong</Tag>
                case -2: return <Tag color="cyan">Run-Error</Tag>
                case -3: return <Tag color="red">Rejected</Tag>
                default: return ''
            }
        }

        return (
            <Card style={{overflow: 'auto'}}>
                <Spin spinning={this.state.isLoading}>
                    <div style={{minWidth: '600px'}}>
                        <Descriptions title="Submission Detail" layout="horizontal" column={{lg: 2, md: 1, sm: 1, xs: 1}} bordered>
                            <Descriptions.Item label="ID">
                                {this.state.work.id}
                                <Button size="small" style={{marginLeft: '15px'}} onClick={() => this.downloadFile(this.state.work.id)}>
                                    <Icon type="download" />
                                </Button>
                            </Descriptions.Item>
                            <Descriptions.Item label="Assignment ID">{this.state.work.assignment.id}</Descriptions.Item>

                            <Descriptions.Item label="Status">
                                {status()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Submit Time">{DateConvertService.convert(this.state.work.submitTime)}</Descriptions.Item>

                            <Descriptions.Item label="Judger">{judgeName()}</Descriptions.Item>
                            <Descriptions.Item label="Judge Time">{judgeTime()}</Descriptions.Item>

                            <Descriptions.Item label="Submit Quantity">{this.state.work.submitQuantity}</Descriptions.Item>
                            <Descriptions.Item label="Comment">{this.state.work.comment}</Descriptions.Item>
                        </Descriptions>

                        <Descriptions layout="vertical" bordered>
                            <Descriptions.Item label="">
                                <pre>{this.state.content}</pre>
                            </Descriptions.Item>
                        </Descriptions>

                        <Button>
                            <Link to={'/member/submission/course/' + this.state.work.assignment.course.id}>Back</Link>
                        </Button>
                    </div>
                </Spin>
            </Card>
        );
    }
}

export default SubmissionDetailComponent;