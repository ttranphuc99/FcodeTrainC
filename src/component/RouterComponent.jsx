import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';

class RouterComponent extends React.Component {
    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                        </Switch>
                    </>
                </Router>
            </>
        );
    }
}

export default RouterComponent;
