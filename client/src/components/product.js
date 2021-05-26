import React, { Component } from "react";
import axios from 'axios';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isVegan: '',
      image: ''
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/", {
      params: {
        upc: this.props.barcode
      }
    })
      .then(res => {
        if(res.data !== "Product not found."){
          this.setState(res.data);
          console.log(this.state);
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    var result = this.state.isVegan? `${this.state.name} is vegan` : `${this.state.name} is not vegan`;
    return (
      <div>
        {this.state.image ? <h1>{result}</h1> : <h1>This product was not found in the food database. Please try again.</h1>}
      </div>
    );
  }
}
