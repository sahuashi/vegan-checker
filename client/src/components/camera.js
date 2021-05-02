import React, { Component } from 'react';
import Scanner from './scanner'
import "./components.css"

export default class Camera extends Component {
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
            <div className="camera">
                <button onClick={this.click}>turn {this.state.scanning? "off" : "on"} camera</button>
                {this.state.scanning? <Scanner/> : null}
            </div>
    )}
}