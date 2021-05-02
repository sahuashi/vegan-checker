import React, { Component } from 'react';
import "./components.css"

export default class Scanner extends Component {
    state = {
        scanning: false
    }

    click = () => {
        this.setState({
            scanning: !this.state.scanning
        })
    }

    render(){
        return (
            <div className="scanner">
                <button onClick={this.click}>turn {this.state.scanning? "off" : "on"} camera</button>
            </div>
    )}
}