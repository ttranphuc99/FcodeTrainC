import React from 'react'
import AnnouncementService from '../../service/AnnouncementService';
import { notification, Typography, Divider, Spin } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import DateConvertService from '../../service/DateConvertService';

class AnnouncementDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            announcement: null
        }

        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({isLoading: true});

        AnnouncementService.getAnnouncement(this.props.id)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Error',
                    top: 70,
                    placement: 'topRight',
                })
                this.props.closeModal();
            }
        }).then(data => {
            this.setState({announcement: data, isLoading: false})
        })
    }

    render() {
        if (this.state.announcement === null) {
            return <Spin spinning={this.state.isLoading}></Spin>
        }

        return (
            <Typography>
                <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>#{this.state.announcement.id} - {this.state.announcement.title}</div>
                    
                <Divider/>

                <Paragraph>
                    <div dangerouslySetInnerHTML={{ __html: this.state.announcement.content }} />
                </Paragraph>

                <Divider/>

                <Text>
                    Creator: {this.state.announcement.creator.fullname} - @{this.state.announcement.creator.username}<br/>
                    Created Time: {DateConvertService.convert(this.state.announcement.createdTime)}<br/>
                    
                    {this.state.announcement.modifier !== null && (
                        <span>
                            Modifier: {this.state.announcement.modifier.fullname} - @{this.state.announcement.modifier.username}<br/>
                            Last Modified: {DateConvertService.convert(this.state.announcement.lastModified)}<br/>
                        </span>
                    )}
                </Text>

            </Typography>
        )
    }
}

export default AnnouncementDetailComponent;
