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

            let role = this.getCookie('role');
            let authPage = [
                '/',
                '/home',
                '/logout'
            ];
            let adminPage = [

            ];
            let memberPage = [

            ];
            let mentorPage = [

            ];

            if (role === 'admin' || role === 'member' || role === 'mentor') {
                if (authPage.includes(this.props.path)) {
                    isAllow = true;
                    return <Route {...this.props}/>
                }
            }
        }

        if (!isAllow) {
            return <Redirect to="/login" />
        }
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}

export default AuthenticationRoute;