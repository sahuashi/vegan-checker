import React, { Component } from 'react';
import Quagga from 'quagga';

export default class Scanner extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.detected = this.detected.bind(this);
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facing: "environment"
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 4,
            decoder: {
                readers : ["upc_reader"],
                multiple: false
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(this.detected);
    }

    detected(result) {
        const code = result.codeResult.code;
        this.props.setScanner({scanning: this.props.scanner.scanning, result: code});
        Quagga.stop();
        this.props.setScanner({scanning: false, result: this.props.scanner.result});
    }

    componentWillUnmount() {
        Quagga.stop();
        console.log(this.props);
    }

    render(){
        return (
            <div>
                <div id="interactive" className="viewport"/>
            </div>
        )
    }
}