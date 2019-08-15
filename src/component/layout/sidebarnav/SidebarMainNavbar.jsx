import React from 'react';
import { Navbar, NavbarBrand } from "shards-react";
import Dispatcher from '../../flux/dispatcher';
import Constants from '../../flux/constants';

class SidebarMainNavbar extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }
    
    handleToggleSidebar() {
        Dispatcher.dispatch({
            actionType: Constants.TOGGLE_SIDEBAR
        });
    }
    
    render() {
        return (
            <div className="main-navbar">
                <Navbar
                    className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
                    type="light"
                >
                    <NavbarBrand
                        className="w-100 mr-0"
                        href="/"
                        style={{ lineHeight: "25px" }}
                    >
                        <div className="d-table m-auto">
                            @{this.props.username || ''} - {this.props.role || ''} 
                        </div>
                    </NavbarBrand>
                    {/* eslint-disable-next-line */}
                    <a
                        className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                        onClick={this.handleToggleSidebar}
                    >
                        <i className="material-icons">&#xE5C4;</i>
                    </a>
                </Navbar>
            </div>
        );
      }
}

export default SidebarMainNavbar;
