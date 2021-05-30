import React, { Component } from 'react';
import './HomePage.css';
import { FileUpload } from '../FileUpload/FileUpload';
import DropZone from '../FileUpload/DropZone';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: ''
        }
    }

    componentDidMount() {
        const currentPath = window.location.pathname.split('/').splice(2,).join('/');
        this.setState({
            currentPath: currentPath
        });
    }

    render() {
        return(
            <>
            <div class="container-fluid">
                <div className="row header">
                    <div className="my-auto"><img src="/logo.png" width="100px"/></div>
                </div>
                <div class="row core">
                    <div class="col-2 sidebar">
                        <div class="row menu mt-4">
                            <div class={"menu-item"+(this.state.currentPath=='selling-prices' ? '-active' : '')}>
                                <a type="button" href="/dashboard/selling-prices">Listing Selling Prices</a>
                            </div>
                            <div class={"menu-item"+(this.state.currentPath=='make-distribution' ? '-active' : '')}>
                                <a type="button" href="/dashboard/make-distribution">Maker Distribution</a>
                            </div>
                            <div class={"menu-item"+(this.state.currentPath=='contacts' ? '-active' : '')}>
                                <a type="button" href="/dashboard/contacts">Most Contacted Listings</a>
                            </div>
                        </div>
                        <div class="row px-3">
                            <div class="col-2 bottom">
                                <a id="upload-csv" class="button" type="button" href="/upload">Upload CSV</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-10">
                    </div>
                    {/* <FileUpload data={this.props.data}/>
                    <DropZone data={this.props.data} /> */}
                </div>
            </div>
            </>
        );
    }
}

export default HomePage;