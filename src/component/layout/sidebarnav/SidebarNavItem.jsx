import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";
import Dispatcher from '../../flux/dispatcher';
import Constants from '../../flux/constants';

function handleToggleSidebar() {
    Dispatcher.dispatch({
        actionType: Constants.TOGGLE_SIDEBAR
    });
}

const SidebarNavItem = ({ item }) => (
    <NavItem>
        <NavLink tag={RouteNavLink} to={item.to} onClick={handleToggleSidebar}>
            {item.htmlBefore && (
                <div
                    className="d-inline-block item-icon-wrapper"
                    dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
                />
            )}
            {item.title && <span>{item.title}</span>}
            {item.htmlAfter && (
                <div
                    className="d-inline-block item-icon-wrapper"
                    dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
                />
            )}
        </NavLink>
    </NavItem>
);

SidebarNavItem.propTypes = {
  item: PropTypes.object
};

export default SidebarNavItem;