import React from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';

import LoginComponent from '../component/LoginComponent';
import LogoutComponent from '../component/LogoutComponent';
import ManageAccountComponent from '../component/authComponent/manageAccount/ManageAccountComponent';
import ManageCourseComponent from '../component/authComponent/manageCourse/ManageCourseComponent';
import ErrorComponent from '../component/ErrorComponent';
import ChangePasswordComponent from '../component/ChangePasswordComponent';
import ProfileComponent from '../component/ProfileComponent';

import Layout from '../component/layout/DefaultLayout';

import AuthenticationRoute from './AuthenticationRoute';
import UnauthenticationRoute from './UnauthenticationRoute';
import CourseDetailComponent from '../component/authComponent/manageCourse/CourseDetailComponent';
import AssignmentDetailComponent from '../component/authComponent/manageAssignment/AssignmentDetailComponent';
import ManageAssignmentComponent from '../component/authComponent/manageAssignment/ManageAssignmentComponent';

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
                                <AuthenticationRoute path="/error" exact component={ErrorComponent}/>
                                <AuthenticationRoute path="/home" exact component={() => {return (<div>Home</div>)}} />
                                <AuthenticationRoute path="/logout" exact component={LogoutComponent}/>
                                <AuthenticationRoute path="/changePassword" exact component={ChangePasswordComponent} />
                                <AuthenticationRoute path="/editProfile" exact component={ProfileComponent}/>
                                <AuthenticationRoute path="/manageAccount" exact component={ManageAccountComponent}/> 

                                <AuthenticationRoute path="/manageCourse/course/:id" exact component={CourseDetailComponent}/>
                                <AuthenticationRoute path="/manageCourse" exact component={ManageCourseComponent}/>  

                                <AuthenticationRoute path="/manageAssignment" exact component={ManageAssignmentComponent}/>
                                <AuthenticationRoute path="/manageAssignment/:courseId" exact component={ManageAssignmentComponent}/>
                                <AuthenticationRoute path="/manageAssignment/assignment/:id" exact component={AssignmentDetailComponent}/>
                            </Layout>
                        </Switch>
                    </>
                </Router>
                
            </>
        );
    }
}

export default RouterComponent;
