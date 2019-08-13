import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginComponent from '../component/LoginComponent';
import HomeComponent from '../component/HomeComponent';
import LogoutComponent from '../component/LogoutComponent';

import AuthenticationRoute from './AuthenticationRoute';
import UnauthenticationRoute from './UnauthenticationRoute';

class RouterComponent extends React.Component {
    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <UnauthenticationRoute path="/login" exact component={LoginComponent} />
                            <AuthenticationRoute path="/" exact component={HomeComponent} />
                            <AuthenticationRoute path="/home" exact component={HomeComponent} />
                            <AuthenticationRoute path="/logout" exact component={LogoutComponent}/>
                        </Switch>
                    </>
                </Router>
            </>
        );
    }
}

export default RouterComponent;
