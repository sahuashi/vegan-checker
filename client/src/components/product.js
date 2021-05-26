import React, { Component } from "react";
import axios from 'axios';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ''
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/", {
      params: {
        upc: this.props.barcode
      }
    })
      .then(res => {
        console.log(res.data);
        this.setState({
          result: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        {this.state.result ? <h1>{this.state.result}</h1> : null}
      </div>
    );
  }
}
