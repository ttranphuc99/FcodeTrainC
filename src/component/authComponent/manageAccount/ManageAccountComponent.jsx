import React from 'react';
import { Tabs, Card } from 'antd';
import UniversityCourseComponent from './UniversityCourseComponent';
import MentorComponent from './MentorComponent';

class ManageAccountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseFirstRender: true,
            mentorFirstRender: true
        }
        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(key) {
        if (key === "2") {
            if (this.state.courseFirstRender) {
                this.setState({courseFirstRender : false});
            } else {
                this.refs.universityCourse.fetchData();
            }
        } else if (key === "3") {
            if (this.state.mentorFirstRender) {
                this.setState({mentorFirstRender : false});
            } else {
                this.refs.mentor.getListAccount();
            }
        }
    }

    render() {
        const { TabPane } = Tabs;

        return(
            <Card>
                <Tabs defaultActiveKey="1" onChange={this.changeTab}>
                    <TabPane tab="Member" key="1">
                        Content of Members
                    </TabPane>
                    <TabPane tab="University Course" key="2">
                        <UniversityCourseComponent ref="universityCourse" forceRender="true"/>
                    </TabPane>
                    <TabPane tab="Mentor" key="3">
                        <MentorComponent ref="mentor" forceRender="true"/>
                    </TabPane>
                </Tabs>
            </Card>
        )
    }
}

export default ManageAccountComponent