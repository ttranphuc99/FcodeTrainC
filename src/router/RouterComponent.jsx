import React from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import { Route } from 'react-router';

import LoginComponent from '../component/LoginComponent';
import HomeComponent from '../component/HomeComponent';
import LogoutComponent from '../component/LogoutComponent';
import ManageAccountComponent from '../component/authComponent/manageAccount/ManageAccountComponent';
import ManagaCourseComponent from '../component/authComponent/manageCourse/ManageCourseComponent';
import ErrorComponent from '../component/ErrorComponent';

import Layout from '../component/layout/DefaultLayout';

import AuthenticationRoute from './AuthenticationRoute';
import UnauthenticationRoute from './UnauthenticationRoute';
import CourseDetailComponent from '../component/authComponent/manageCourse/CourseDetailComponent';
import AssignmentComponent from '../component/authComponent/manageCourse/AssignmentComponent';



class RouterComponent extends React.Component {
    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <UnauthenticationRoute path="/login" exact component={LoginComponent} />
                            <UnauthenticationRoute path="/" exact component={LoginComponent} />
                            <Layout>
                                <Router>
                                    <Route path='/manageCourse/course/:id' component={/*CourseDetailComponent*/AssignmentComponent}/>
                                </Router>
                                <AuthenticationRoute path="/error" exact component={ErrorComponent}/>
                                <AuthenticationRoute path="/home" exact component={HomeComponent} />
                                <AuthenticationRoute path="/logout" exact component={LogoutComponent}/>
                                <AuthenticationRoute path="/manageAccount" exact component={ManageAccountComponent}/> 
                                <AuthenticationRoute path="/manageCourse" exact component={ManagaCourseComponent}/>  
                            </Layout>
                        </Switch>
                    </>
                </Router>
                
            </>
        );
    }
}

export default RouterComponent;
