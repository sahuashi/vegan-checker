import React, { Component } from 'react';
import Quagga from 'quagga';

export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this.detected = this.detected.bind(this);
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: '800',
                    height: '500'
                }
            },
            numberOfWorkers: navigator.hardwareConcurrency,
            decoder: {
                readers : ["upc_reader"]
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
        this.props.setScanner({scanning: false, barcode: result.codeResult.code});
    }

    componentWillUnmount() {
        Quagga.stop();
        Quagga.offDetected(this.detected);
    }

    render(){
        return (
            <div>
                <div id="interactive" className="viewport"/>
            </div>
        )
    }
}