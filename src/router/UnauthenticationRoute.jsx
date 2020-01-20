import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import LoginService from '../service/LoginService';

class UnauthenticationRoute extends React.Component {
    render() {
        
        if (LoginService.isLoggedIn()) {
            // return <Redirect to='/home' />;
            return <Redirect to='/closePage'/>
        }

        return <Route {...this.props} />;
    }
}

export default UnauthenticationRoute;