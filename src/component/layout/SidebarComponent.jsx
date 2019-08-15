import React from "react";
import { Col } from "shards-react";
import Store from '../flux/store';
import classNames from "classnames";
import SidebarMainNavbar from './sidebarnav/SidebarMainNavbar';
import SidebarListItems from './sidebarnav/SidebarListItems';

class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          menuVisible: false,
          sidebarNavItems: Store.getSidebarItems()
        };
    
        this.onChange = this.onChange.bind(this);
    }
    
    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }
    
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            ...this.state,
            menuVisible: Store.getMenuState(),
            sidebarNavItems: Store.getSidebarItems()
        });
    }
    
    render() {
        const classes = classNames(
            "main-sidebar",
            "px-0",
            "col-12",
            this.state.menuVisible && "open"
        );
    
        return (
            <Col
                tag="aside"
                className={classes}
                lg={{ size: 2 }}
                md={{ size: 3 }}
            >
                <SidebarMainNavbar username={this.props.username} role={this.props.role} hideLogoText={this.props.hideLogoText} />
                <SidebarListItems />
            </Col>
        );
    }
}

export default SidebarComponent;