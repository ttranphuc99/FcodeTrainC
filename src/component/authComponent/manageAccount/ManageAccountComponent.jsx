import React from 'react';
import { Tabs, Card } from 'antd';
import UniversityCourseComponent from './UniversityCourseComponent';
import AccountComponent from './AccountComponent';

class ManageAccountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseFirstRender: true,
            mentorFirstRender: true,
            memberFirstRender: true
        }
        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(key) {
        if (key === 2) {
            if (this.state.courseFirstRender) {
                this.setState({courseFirstRender : false});
            } else {
                this.refs.universityCourse.fetchData();
            }
        } else if (key === 3) {
            if (this.state.mentorFirstRender) {
                this.setState({mentorFirstRender : false});
            } else {
                this.refs.mentor.getListAccount();
            }
        } else if (key === 1) {
            if (this.state.menberFirstRender) {
                this.setState({memberFirstRender : false});
            } else {
                this.refs.member.getListAccount();
            }
        }
    }

    render() {
        const { TabPane } = Tabs;

        return(
            <Card>
                <Tabs defaultActiveKey="1" onChange={this.changeTab}>
                    <TabPane tab="Member" key={1}>
                    <AccountComponent accRole={2} ref="member" forceRender="true"/>
                    </TabPane>
                    <TabPane tab="University Course" key={2}>
                        <UniversityCourseComponent ref="universityCourse" forceRender="true"/>
                    </TabPane>
                    <TabPane tab="Mentor" key={3}>
                        <AccountComponent accRole={3} ref="mentor" forceRender="true"/>
                    </TabPane>
                </Tabs>
            </Card>
        )
    }
}

export default ManageAccountComponent