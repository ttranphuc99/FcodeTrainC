import React from 'react';
import { Tabs, Card } from 'antd';
import UniversityCourseComponent from './UniversityCourseComponent';
import MentorComponent from './MentorComponent';

class ManageAccountComponent extends React.Component {
    render() {
        const { TabPane } = Tabs;

        return(
            <Card>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Member" key="1">
                        Content of Members
                    </TabPane>
                    <TabPane tab="University Course" key="2">
                        <UniversityCourseComponent />
                    </TabPane>
                    <TabPane tab="Mentor" key="3">
                        <MentorComponent />
                    </TabPane>
                </Tabs>
            </Card>
        )
    }
}

export default ManageAccountComponent