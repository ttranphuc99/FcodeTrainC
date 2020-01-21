import React from 'react';
import img from '../image/close.png';

class ClosePageComponent extends React.Component {
    render() {
        return <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}>
            <img style={{height: '80vh'}} alt="Close" src={img}/>
        </div>
    }
}

export default ClosePageComponent;