import React, { Component } from 'react';
import FileUpload from './FileUpload/FileUpload';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <FileUpload />
        );
    }
}

export default Main;