import React from 'react'

class ErrorComponent extends React.Component {
    render() {
        return(<span>Error {this.props.error} </span>)
    }
}

export default ErrorComponent
