import React from 'react'
import CourseService from '../../../service/CourseService';
import { Redirect } from 'react-router-dom';
import { Select, Card, notification, Icon, Tag, Table } from 'antd';
import AccountCourseService from '../../../service/AccountCourseService';
import LoginService from '../../../service/LoginService';
import '../../../stylesheet/TableStyle.css';


class ChartComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chart: [],
            isLoading: false,
            isLoadingCourse: false,
            listCourse: [],
            currentCourse: -1,
            isError: false,
            error: ''
        }

        this.getListCourse = this.getListCourse.bind(this);
        this.loadChart = this.loadChart.bind(this);
        this.asyncForEach = this.asyncForEach.bind(this);
    }

    componentDidMount() {
        this.getListCourse();
    }

    getListCourse() {
        this.setState({isLoadingCourse: true});

        if (this.props.match.path === "/chart") {
            CourseService.getListCourse()
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
                if (data != null) {
                    this.setState({listCourse: data, currentCourse: data[0].id});
                    this.loadChart(data[0].id)
                }
                this.setState({isLoadingCourse: false});
            }).catch((err) => {
                this.setState({ isError: true, error: err });
                this.setState({isLoadingCourse: false});
            })
        } else {
            AccountCourseService.getCourseOfAccount()
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
                if (data != null) {
                    this.setState({listCourse: data, currentCourse: data[0].id});
                    this.loadChart(data[0].id)
                }
                this.setState({isLoadingCourse: false});
            }).catch((err) => {
                this.setState({ isError: true, error: err });
                this.setState({isLoadingCourse: false});
            })
        }
    }

    async loadChart(courseId) {
        await this.setState({currentCourse: courseId, isLoading: true});

        AccountCourseService.getChart(courseId)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                notification.error({
                    message: 'Error',
                    description: "Error",
                    top: 70,
                    placement: 'topRight',
                })
            }
        }).then(data => {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        data[i].rank = 1;
                    } else {
                        if (data[i].totalMark === data[i-1].totalMark) {
                            data[i].rank = data[i-1].rank;
                        } else {
                            data[i].rank = i+1;
                        }
                    }
                }

                this.setState({
                    isLoading: false,
                    chart: data
                })
            }
        })
    }

    async asyncForEach(array, callback) {	
        for (let index = 0; index < array.length; index++) {	
          await callback(array[index], index, array);	
        }	
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const {Option} = Select;

        const column = [
            {
                title: '',
                key: 'icon',
                render: record => {
                    if (record.rank === 1 && record.totalMark > 0) {
                        return (
                            <div>
                                <span style={{marginRight: '5px', color: 'red'}}><Icon type="fire" theme="filled" /></span>
                            </div>
                        )
                    }

                    if (record.rank === 2 && record.totalMark > 0) {
                        return (
                            <div>
                                <span style={{marginRight: '5px', color: 'blue'}}><Icon type="thunderbolt" theme="filled" /></span>
                            </div>
                        )
                    }

                    return (<span></span>)
                },
                align: 'right',
                width: '5%'
            },
            {
                title: 'Rank',
                key: 'rank',
                dataIndex: 'rank',
                align: 'center',
                width: '7%'
            },
            {
                title: 'Account',
                key: 'account',
                render: (record) => {
                    const value = record.id.account.fullname + " - @" + record.id.account.username;

                    if (LoginService.getUsername() === record.id.account.username) {
                        return (<span style={{fontWeight: 'bold'}}>{value}</span>)
                    }
                    return value + 'ahihi';
                }
            },
            {
                title: 'Mark',
                key: 'mark',
                dataIndex: 'totalMark',
                align: 'center',
                width: '15%'
            },
            {
                title: 'Status',
                key: 'status',
                render: (record) => {
                    if (record.status === 0) {
                        return <Tag color="gray">Unactive</Tag>
                    } else {
                        return <Tag color="blue">Active</Tag>
                    }
                },
                align: 'center',
                width: '20%'
            }
        ]

        return (
            <Card>
                <Select 
                    loading={this.state.isLoadingCourse}
                    placeholder="Select Course ..."
                    onChange={this.loadChart}
                    style={{width: '25%', minWidth: '200px'}}
                    value={this.state.currentCourse > 0 ? this.state.currentCourse : 'Select Course...'}
                >
                    {this.state.listCourse.map(course => (
                        <Option key={course.id} value={course.id}>{course.name}</Option>   
                    ))}
                </Select>

                {this.state.currentCourse > 0 && 
                    <Table 
                        columns={column} 
                        dataSource={this.state.chart} 
                        loading={this.state.isLoading} 
                        pagination={false} 
                        rowKey={record => record.id.account.id}
                        rowClassName={(record, index) => {if (LoginService.getUsername() === record.id.account.username) return 'highlightRow'; return ''}}
                    />}
            </Card>
        )
    }

}

export default ChartComponent;
