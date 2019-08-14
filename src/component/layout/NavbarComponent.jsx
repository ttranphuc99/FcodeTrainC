import React from 'react';
import { Navbar, Nav } from "shards-react";
import UserAction from './navbarnav/UserAction';
import NavbarToggle from './navbarnav/NavbarToggle';

class NavbarComponent extends React.Component {

    render() {
        return (
            <div className="main-navbar bg-white sticky-top">
                <div className="p-0">
                    <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0 justify-content-end">
                        <Nav navbar className="flex-row">
                            <UserAction/>
                            <NavbarToggle/>
                        </Nav> 
                    </Navbar>
                </div>
            </div>
        )
    }
}

export default NavbarComponent;