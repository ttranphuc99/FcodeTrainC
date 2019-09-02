import React from 'react'
import {Redirect} from 'react-router-dom'
import ProfileService from '../../../service/ProfileService';
import { notification, Spin, Descriptions, Tag } from 'antd';

class ProfileDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirecting: false,
            isError: false,
            isLoading: true,
            profile: null
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        // this.fetchData();
    }

    fetchData() {
        this.setState({ isLoading: true });
               
        ProfileService.loadProfiles(this.props.username)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                localStorage.setItem('loggedIn', false);
                this.setState({ redirecting: true });
            } else if (response.status === 404) {
                if (this.props.notFound) {
                    this.props.notFound();
                } else {
                    notification.error({
                        message: 'Error',
                        description: "Not found user " + this.props.username,
                        top: 70,
                        placement: 'topRight',
                    })
                }
            } else {
                this.setState({ isError: true, error: response });
            }
        }).then(data => {            
            if (data != null) {
                this.setState({ profile: data, isLoading: false });
            } else {
                this.setState({ isLoading: false });
            }
            
        }).catch(err => {
            this.setState({ isError: true, error: err });
        })
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        if (this.state.isError) return <Redirect to="/error" error={this.state.error}/>

        const id = this.state.profile != null ? "ID: " + this.state.profile.id || "" : '';
            
        return (
            <Spin spinning={this.state.isLoading}> 
                {this.state.isLoading ? <div>Loading</div> : (                 
                <Descriptions title={id} column={2}>
                    <Descriptions.Item label="Username">{this.state.profile.username || ''}</Descriptions.Item>
                    <Descriptions.Item label="Fullname">{this.state.profile.fullname || ''}</Descriptions.Item>

                    <Descriptions.Item label="Description" span="2">{this.state.profile.description || ''}</Descriptions.Item>

                    <Descriptions.Item label="Role">{this.state.profile.role.name || ''}</Descriptions.Item>
                    <Descriptions.Item label="Username">{this.state.profile.universityCourse.name || ''}</Descriptions.Item>

                    <Descriptions.Item label="Status">
                        {this.state.profile.status === 1 ? <Tag color="blue">Active</Tag> : <Tag color="red">Banned</Tag>}
                    </Descriptions.Item>
                    {this.props.isAuth ? 
                       <Descriptions.Item label="Creator">{this.state.profile.creatorName || ''} - @{this.state.profile.creatorUsername}</Descriptions.Item> 
                        : ''}

                    {this.props.isAuth ? 
                        <Descriptions.Item label="Created Date">{this.state.profile.dateCreated || ''}</Descriptions.Item> 
                        : ''}
                    {this.props.isAuth ? 
                        <Descriptions.Item label="Last Modified">{this.state.profile.lastModified || ''}</Descriptions.Item> 
                        : ''}

                </Descriptions>
                )}
            </Spin>
        )
    }
}

export default ProfileDetailComponent;
