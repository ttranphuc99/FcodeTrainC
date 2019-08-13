import React from 'react';
import LoginService from '../service/LoginService';

class LogoutComponent extends React.Component {
    process = async () => {
        let status = await LoginService.logout();
        if (status === 204) {
            sessionStorage.setItem('loggedIn', false);
        }
        this.props.history.push('/login');
    }

    componentDidMount() {
        this.process();
    }

    render() {
        return (
            <div>Processing</div>
        )
    }
}

export default LogoutComponent;
