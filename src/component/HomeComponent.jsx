import React from 'react';

class HomeComponent extends React.Component {
    render() {
        return (
            <div>
                <p>Logged in</p>
                <a href="/logout">Logout</a>
                <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
            </div>
        )
    }
}

export default HomeComponent;
