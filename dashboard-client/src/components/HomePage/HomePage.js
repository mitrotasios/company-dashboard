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
                        <div class="row">
                            <div class="col-2 bottom">
                                <div>
                                    <a id="upload-csv" class="button" type="button" href="/upload">Upload CSV</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-10 px-5">
                        <div className="row profile-info mt-4">

                        </div>
                        <div className="row kpis mt-4">
                            <div className="col-3 primary-kpi my-auto">
                                <div className="row h-100">
                                    <div className="col my-auto px-4">
                                        <div>Listings year-to-date (Δ% last year)</div>
                                        <div><span className="KPI">10.441 listings</span> <span>(+34%)</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 secondary-kpi my-auto">
                                <div className="row h-100">
                                    <div className="col my-auto px-4">
                                        <div>Listing-to-buy rate </div>
                                        <div><span className="KPI">10%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
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