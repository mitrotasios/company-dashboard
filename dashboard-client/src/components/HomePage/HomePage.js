import React, { Component } from 'react';
import './HomePage.css';
import { FileUpload } from '../FileUpload/FileUpload';
import DropZone from '../FileUpload/DropZone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

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

    renderContent(path) {
        switch(path) {
            case 'selling-prices':
                return(
                    <div></div>
                );
            case 'make-distribution':
                return(
                    <div></div>
                );
            case 'contacts':
                return(
                    <div></div>
                );
            case 'upload':
                return(
                    <DropZone 
                        data={this.props.data} 
                        addData={this.props.addData} />
                );
        }
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
                                <div className="line"></div>
                                <div className="row helper">
                                    <div className="col-3">
                                        <div className="avatar-wrapper">
                                            <img src="/memoji.png" />
                                        </div>
                                    </div>
                                    <div className="col my-auto">
                                        <div style={{"fontWeight": "500"}}>Anna Henderson</div>
                                    </div>
                                </div>
                                <div>
                                    <a id="upload-csv" class="button" type="button" href="/dashboard/upload"><FontAwesomeIcon icon={faPlus} size='1x'/><span className="ml-1"> Upload CSV</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-10 px-5">
                        <div className="row profile-info mt-4">
                            <div className="col-1 my-auto">
                                <div className="avatar-wrapper">
                                    <img src="/memoji.png" />
                                </div>
                            </div>
                            <div className="col my-auto msg">
                                {
                                    this.state.currentPath == "upload" ? (
                                        <>
                                        <div className="main-msg">You can upload your CSV files here, <b>Anna!</b></div>
                                        <div className="sub-msg">Upload your files and get instant analytics.</div>
                                        </>
                                    ) : (
                                        <>
                                        <div className="main-msg">Good Morning, <b>Anna!</b></div>
                                        <div className="sub-msg">Here’s an overview of your company’s performance.</div>
                                        </>
                                    )
                                }
                            </div>
                            {this.state.currentPath == "upload" ? (
                                <div className="col my-auto return-home align-self-end text-end">
                                    <span style={{"color":"#7D7C7E"}}><a type="button" href="/">
                                        <FontAwesomeIcon icon={faAngleLeft} size='lg'/><span>{' '}</span> Return to dashboard</a>
                                    </span>
                                </div>
                            ) : null}
                        </div>
                        {
                            this.state.currentPath == "upload" ? null : (
                                <div className="row kpis mt-2">
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
                            )
                        }
                        <div className="row main-content">
                            {this.renderContent(this.state.currentPath)}
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