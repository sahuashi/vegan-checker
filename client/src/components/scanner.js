import React, { Component } from 'react';
import Quagga from 'quagga';

export default class Scanner extends Component {
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
        console.log(result);
        Quagga.stop();
    }

    componentWillUnmount() {
        Quagga.offDetected(this.detected);
    }

    render(){
        return (
            <div>
                this is where the scanner will appear
                <div id="interactive" className="viewport"/>
            </div>
        )
    }
}