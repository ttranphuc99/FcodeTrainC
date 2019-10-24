import React from 'react'
import LoginService from '../service/LoginService'
import AdminAnnouncementComponent from './authComponent/home/AdminAnnouncementComponent';
import MentorAnnouncementComponet from './mentorComponent/home/MentorAnnouncementComponent'
import MemberAnnouncementComponent from './memComponent/home/MemberAnnouncementComponent'

class HomeComponent extends React.Component {
    render() {
        if (LoginService.getRole() === 'admin') {
            return <AdminAnnouncementComponent/>
        } else if (LoginService.getRole() === 'mentor') {
            return <MentorAnnouncementComponet/>
        } else {
            return <MemberAnnouncementComponent/>
        }
    }
}

export default HomeComponent;