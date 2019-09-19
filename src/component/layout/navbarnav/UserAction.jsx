import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import '../../../stylesheet/layout/UserActionStyle.css';

class UserAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
        <NavItem tag={Dropdown} caret toggle={this.toggleUserActions} className="wrap-user-action">
            <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                <span className="d-md-inline-block fullname">{this.props.fullname || ''}</span>
            </DropdownToggle>
            <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                <DropdownItem tag={Link} to="/editProfile">
                    Edit Profile
                </DropdownItem>
                <DropdownItem tag={Link} to="/changePassword">
                    Change Password
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/logout" className="text-danger">
                  <i className="fa fa-sign-out" aria-hidden="true" style={{color: 'red'}}></i>Logout
                </DropdownItem>
            </Collapse>
        </NavItem>
    );
  }
}

export default UserAction;
