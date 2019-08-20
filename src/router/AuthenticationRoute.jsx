import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import LoginService from '../service/LoginService';

class AuthenticationRoute extends React.Component {
    render() {
        let isAllow = false;

        if (LoginService.isLoggedIn()) {

            let role = LoginService.getRole();
            let authPage = [
                '/home',
                '/logout'
            ];
            let adminPage = [
                '/universityCourse'
            ];
            let memberPage = [

            ];
            let mentorPage = [

            ];

            if (role === 'admin' || role === 'member' || role === 'mentor') {
                if (authPage.includes(this.props.path)) {
                    isAllow = true;
                    return <Route {...this.props}/>
                } else if (role === 'admin' && adminPage.includes(this.props.path)) {
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