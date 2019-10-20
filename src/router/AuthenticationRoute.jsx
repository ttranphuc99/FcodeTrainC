import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import LoginService from '../service/LoginService';

class AuthenticationRoute extends React.Component {
    include(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (value.includes(array[i])) {
                return true;
            }
        }
        return false;
    }

    render() {
        let isAllow = false;

        if (LoginService.isLoggedIn()) {

            let role = LoginService.getRole();
            let authPage = [
                '/home',
                '/logout',
                '/error',
                '/changePassword',
                '/editProfile'
            ];
            let adminPage = [
                '/manageAccount',
                '/manageCourse',
                '/manageAssignment',
                '/manageSubmission',
                '/chart'
            ];
            let memberPage = [
                '/member/course',
                '/member/assignment',
                '/member/submission',
                '/member/chart'
            ];
            let mentorPage = [

            ];
            if (role === 'admin' || role === 'member' || role === 'mentor') {
                if (this.include(authPage, this.props.path)) {
                    isAllow = true;
                    return <Route {...this.props}/>
                } else if (role === 'admin' && this.include(adminPage, this.props.path)) {
                    isAllow = true;
                    return <Route {...this.props}/>
                } else if (role === 'member' && this.include(memberPage, this.props.path)) {
                    isAllow = true;
                    return <Route {...this.props}/>
                }
            }

            if (!isAllow) {
                // if (this.props.path.includes('/home')) {
                //     return <Redirect to="/login" />
                // }
                // return <Redirect to="/home" />
                return null;
            }
        } else {
            return <Redirect to='/login'/>
        }        
    }
}

export default AuthenticationRoute;