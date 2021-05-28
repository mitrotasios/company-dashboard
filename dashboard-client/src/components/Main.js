import React, { Component } from 'react';
import { FileUpload } from './FileUpload/FileUpload';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: "1000", make: "Audi", price: "49972", mileage: 65000, seller_type: "private"},
                {id: "1001", make: "BMW", price: "30000", mileage: 23000, seller_type: "dealet"},
                {id: "1002", make: "VW", price: "12300", mileage: 120000, seller_type: "other"},
                {id: "1003", make: "Audi", price: "87000", mileage: 9000, seller_type: "private"},
            ]
        }
    }


    render() {
        return(
            <FileUpload data={this.state.data}/>
        );
    }
}

export default Main;