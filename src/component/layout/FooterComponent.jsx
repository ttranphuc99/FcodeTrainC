import React from 'react';
import { Row, Col} from "shards-react";

class FooterComponent extends React.Component {
  render() {
    return (
      <footer className="main-footer d-flex p-2 px-3 bg-white border-top" style={{justifyContent: 'center', marginLeft: '-10%', textAlign: 'center'}}>
        <div>
          <Row>
            <Col>
              <div className="copyright">Develop by Tran Thien Phuc - FPT University</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="copyright"> A present for F-Code Club</div>
            </Col>
          </Row>
        </div>
      </footer>
    )
  }
}

export default FooterComponent;
