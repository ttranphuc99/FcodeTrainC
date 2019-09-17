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
        console.log('path: ', this.props.path);
        let isAllow = false;

        if (LoginService.isLoggedIn()) {

            let role = LoginService.getRole();
            let authPage = [
                '/home',
                '/logout',
                '/error'
            ];
            let adminPage = [
                '/manageAccount',
                '/manageCourse',
                '/manageAssignment'
            ];
            let memberPage = [

            ];
            let mentorPage = [

            ];

            if (role === 'admin' || role === 'member' || role === 'mentor') {
                console.log('pathhhh ', this.props.path);
                if (authPage.includes(this.props.path)) {
                    isAllow = true;
                    return <Route {...this.props}/>
                } else if (role === 'admin' && this.include(adminPage, this.props.path)) {
                    isAllow = true;
                    return <Route {...this.props}/>
                }
            }
        }

        if (!isAllow) {
            return <Redirect to="/login" />
        }
    }
}

export default AuthenticationRoute;