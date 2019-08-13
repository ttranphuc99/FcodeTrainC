import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import LoginService from '../service/LoginService';

class UnauthenticationRoute extends React.Component {
    render() {
        if (LoginService.isLoggedIn() === 'true') {
            return <Redirect to='/' />;
        }

        return <Route {...this.props} />;
    }
}

export default UnauthenticationRoute;