import React from 'react';
import LoginService from '../service/LoginService';
import { Redirect } from 'react-router-dom';

class LogoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirecting: false
        }
    }
    process = async () => {
        let status = await LoginService.logout();
        if (status === 204) {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            this.setState({redirecting: true})
        }
    }

    componentDidMount() {
        this.process();
    }

    render() {
        if (this.state.redirecting) return <Redirect to="/login"/>
        return (
            <div>Processing</div>
        )
    }
}

export default LogoutComponent;
