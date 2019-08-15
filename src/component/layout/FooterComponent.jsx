import React from 'react';
import { Row} from "shards-react";

class FooterComponent extends React.Component {
  render() {
    return (
      <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
        <div>
          <Row>
            <span className="copyright ml-auto my-auto mr-2">copyright</span>
          </Row>
        </div>
      </footer>
    )
  }
}

export default FooterComponent;
