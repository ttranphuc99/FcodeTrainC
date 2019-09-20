import React from "react";
import { Container, Row, Col } from "shards-react";

import NavbarComponent from "./NavbarComponent";
import SidebarComponent from "./SidebarComponent";
import FooterComponent from "./FooterComponent";
import LoginService from '../../service/LoginService';

import "../../stylesheet/layout/LayoutStyle.css";

class Layout extends React.Component {

  render() {
    const username = LoginService.getUsername();
    const fullname = LoginService.getFullname();
    const role = LoginService.getRole();
    return (
      <Container fluid>
        <Row>
          <SidebarComponent username={username} role={role} />
          <Col
            className="main-content px-0"
            lg={{ size: 10, offset: 2 }}
            md={{ size: 9, offset: 3 }}
            sm="12"
            tag="main"
          >
            <NavbarComponent fullname={fullname} />
            <div className="wrap-content-layout">{this.props.children}</div>
            <FooterComponent />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Layout;
