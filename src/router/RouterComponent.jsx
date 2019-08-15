import React from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';

import LoginComponent from '../component/LoginComponent';
import HomeComponent from '../component/HomeComponent';
import LogoutComponent from '../component/LogoutComponent';

import Layout from '../component/layout/DefaultLayout';

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
                            <Layout>
                                <AuthenticationRoute path="/" exact component={HomeComponent} />
                                <AuthenticationRoute path="/home" exact component={HomeComponent} />
                                <AuthenticationRoute path="/logout" exact component={LogoutComponent}/>
                            </Layout>
                        </Switch>
                    </>
                </Router>
            </>
        );
    }
}

export default RouterComponent;
