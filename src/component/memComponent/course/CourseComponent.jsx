import React from 'react'
import { Card, Table, Tag, Input, Icon, Button } from 'antd';
import {Link, Redirect} from 'react-router-dom';
import AccountCourseService from '../../../service/AccountCourseService';

class CourseComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            listCourse: [],
            isError: false,
            error: ''
        }
        this.fetchData = this.fetchData.bind(this);
        this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({isLoading: true});
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
                this.setState({
                    listCourse: data,
                    isLoading: false
                })
            }
            this.setState({isLoading: false});
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {this.searchInput = node;}}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const column = [
            {
                title: 'ID',
                key: 'id',
                render: record => {
                    return record.id
                },
                sorter: (a,b) => a.id - b.id,
                width: '10%'
            },
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                width: '35%',
                ...this.getColumnSearchProps('name')
            },
            {
                title: 'Status',
                key: 'status',
                width: '10%',
                render: record => {
                    if(record.status === 1) {
                        return <Tag color="blue">Active</Tag>
                    }
                    return <Tag color="red">Closed</Tag>
                },
                filters: [
                    {
                        text: 'Active',
                        value: 1
                    }, 
                    {
                        text: 'Closed',
                        value: 0
                    }
                ],
                onFilter: (value, record) => record.status === value
            },
            {
                title: 'Joined Time',
                key: 'joinedTime',
                dataIndex: 'joinedTime'
            }
        ];

        return(
            <Card style={{overflow: 'auto'}}>
                <Table 
                    loading={this.state.isLoading}
                    pagination={{pageSize: 10}}
                    rowKey={record => record.id}
                    style={{minWidth: '700px'}}
                    columns={column}
                    dataSource={this.state.listCourse}
                />
            </Card>
        )
    }
}

export default CourseComponent;