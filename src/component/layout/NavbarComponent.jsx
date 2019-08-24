import React from 'react';
import { Navbar } from "shards-react";
import UserAction from './navbarnav/UserAction';
import NavbarToggle from './navbarnav/NavbarToggle';

class NavbarComponent extends React.Component {

    render() {
        return (
            <div className="main-navbar bg-white sticky-top">
                <div className="p-0 wrap-content-navbar">
                    <Navbar type="light" className="flex-md-nowrap p-0 navbar-user-action">
                        <UserAction fullname={this.props.fullname} />
                    </Navbar>
                    <NavbarToggle/>
                </div>
            </div>
        )
    }
}

export default NavbarComponent;