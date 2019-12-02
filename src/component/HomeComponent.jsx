import React from 'react'
import { Redirect } from 'react-router-dom';
import LoginService from '../service/LoginService'
import AdminAnnouncementComponent from './authComponent/home/AdminAnnouncementComponent';
import MentorAnnouncementComponet from './mentorComponent/home/MentorAnnouncementComponent'
import MemberAnnouncementComponent from './memComponent/home/MemberAnnouncementComponent'

class HomeComponent extends React.Component {
    render() {
        console.log("roleeee" , LoginService.getRole())
        if (LoginService.getRole() === 'admin') {
            return <AdminAnnouncementComponent/>
        } else if (LoginService.getRole() === 'mentor') {
            return <MentorAnnouncementComponet/>
        } else if (LoginService.getRole() === 'member') {
            return <MemberAnnouncementComponent/>
        } else {
            return <Redirect to='/login'/>
        }
    }
}

export default HomeComponent;