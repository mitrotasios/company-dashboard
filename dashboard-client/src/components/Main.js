import React, { Component } from 'react';
import { FileUpload } from './FileUpload/FileUpload';
import DropZone from './FileUpload/DropZone';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('/api/listings')
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        }, error => {
            throw error;
            }
        )
        .then(response => response.json())
        .then(response => this.setState({data: response}))
        .catch(error => { console.log('User', error.message); alert("GET was not possible")});
    } 

    render() {
        return(
            <>
            
                <FileUpload data={this.state.data}/>
                <DropZone data={this.state.data} />
            </>
        );
    }
}

export default Main;