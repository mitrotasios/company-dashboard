import React, { Component } from 'react';
import './HomePage.css';
import FileUpload from '../FileUpload/FileUpload';
import PriceChart from '../Charts/PriceChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Contacts from '../Charts/ContactsChart';
import MakeDist from '../Charts/MakeDistChart';

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
                    <PriceChart listings={this.props.listings} />
                );
            case 'make-distribution':
                return(
                    <MakeDist listings={this.props.listings} />
                );
            case 'contacts':
                return(
                    <Contacts listings={this.props.listings} />
                );
            case 'upload':
                return(
                    <FileUpload 
                        data={this.props.data} 
                        addData={this.props.addData} />
                );
        }
    }

    deleteRequest = () => {
        fetch('/api/listings', {
                method: 'DELETE'
            })
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
            .then(response => alert("All files have been successfully deleted"))
            .catch(error => { console.log('User', error.message) });
    }

    render() {
        return(
            <>
            <div className="container-fluid min-vh-100 d-flex flex-column">
                <div className="row header">
                    <div className="col">
                        <a href="/"><div className="my-auto"><img src="/logo.png" width="100px"/></div></a>
                    </div>
                    <div className="col-2 my-auto align-self-end text-end">
                        <a class="delete-button" type="button" onClick={this.deleteRequest}>Delete Data</a>
                    </div>
                </div>
                <div class="row main-row d-flex flex-row flex-grow-1">
                    <div class="col-2 flex-grow-1 sidebar core py-3">
                        <div class="row menu mt-4">
                            <div class={"menu-item"+(this.state.currentPath=='selling-prices' ? '-active' : '')}>
                                <a type="button" href="/dashboard/selling-prices">Listing Selling Prices</a>
                            </div>
                            <div class={"menu-item"+(this.state.currentPath=='make-distribution' ? '-active' : '')}>
                                <a type="button" href="/dashboard/make-distribution">Maker Distribution</a>
                            </div>
                            <div class={"menu-item"+(this.state.currentPath=='contacts' ? '-active' : '')}>
                                <a type="button" href="/dashboard/contacts">Listing Contacts</a>
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
                            <div className="col my-auto top-wrapper">
                                <div style={{"marginLeft":"-15px"}} className="avatar-wrapper">
                                    <img src="/memoji.png" />
                                </div>
                                <div className="text-msg">
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
                            </div>
                            {this.state.currentPath == "upload" ? (
                                <div className="col my-auto return-home align-self-end text-end">
                                    <span style={{"color":"#7D7C7E"}}><a type="button" href="/">
                                        <FontAwesomeIcon icon={faAngleLeft} size='lg'/><span>{' '}</span> Return to dashboard</a>
                                    </span>
                                </div>
                            ) : null}
                        </div>
                        <div className="row main-content">
                            {this.renderContent(this.state.currentPath)}
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default HomePage;