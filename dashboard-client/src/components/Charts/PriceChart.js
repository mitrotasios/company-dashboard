import React, { Component } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import './Charts.css';
import Skeleton from '@yisheng90/react-loading';

class PriceChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            pSum: 0,
            dSum: 0,
            oSum: 0,
            config: {
                type: 'bar',
                title: {
                    text: "Average Listing Price (EUR)",
                    'font-family': "Helvetica",
                    'text-align': "left",
                    'font-color': "#2D2D35",
                },
                plot: {
                    stacked: true,
                },
                scaleX: {
                    guide: {
                        lineStyle: "dashed",
                    },
                    labels: ["Private", "Dealer", "Other"]
                },
                series: [{
                    values: [1500,2500,4000],
                    'background-color': "rgba(43, 109, 247, 0.6)"
                }]
            }
        }
    }

    

    componentDidMount() {
        fetch('/api/listings?table=listings')
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
        .then(response => this.calculateMetrics(response))
        .catch(error => { console.log('User', error.message)});
    }

    calculateMetrics(data) {
        var pSum = 0;
        var privateS = data.filter(row => {if (row.seller_type == "private") pSum += row.price; return row.price;})
        var dSum = 0;
        var dealer = data.filter(row => {if (row.seller_type == "dealer") dSum += row.price; return row.price;})
        var oSum = 0;
        var other = data.filter(row => {if (row.seller_type == "other") oSum += row.price; return row.price;})
        var newSeries = [{values: [pSum/privateS.length, dSum/dealer.length, oSum/other.length], 'background-color': "rgba(43, 109, 247, 0.6)"}]

        this.setState({
            config: {...this.state.config, series: newSeries},
            data: data,
            pSum: pSum,
            dSum: dSum,
            oSum: oSum,
            isLoading: false

        })
    }

    render() {
        return (
            this.state.isLoading ? (
                <>
                <div className="row kpis mt-2">
                    <div className="col-12 col-lg-6 col-xl-3 my-auto">
                        <div className="row">
                            <Skeleton height="100px" width="100%"/>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-3 my-auto ml-3">
                        <div className="row">
                            <Skeleton height="100px" width="100%"/>
                        </div>
                    </div>
                </div>
                <div className="row chart mt-5 text-center px-2">
                    <div className="col px-4">
                        <Skeleton height="50vh" width="100%"/>
                    </div>
                </div>
                </>
            ) : (
                <>
                <div className="row kpis">
                    <div className="col-12 col-lg-6 col-xl-3 primary-kpi my-auto">
                        <div className="row h-100">
                            <div className="col my-auto px-4">
                                <div>Average listing price</div>
                                <div><span className="KPI">{((this.state.pSum+this.state.dSum+this.state.oSum)/this.state.data.length).toFixed(2)} EUR</span> </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-3 secondary-kpi my-auto">
                        <div className="row h-100">
                            <div className="col my-auto px-4">
                                <div>Number of listings </div>
                                <div><span className="KPI">{this.state.data.length}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row chart">
                    <ZingChart data={this.state.config}/>
                </div>
                </>
            )
        );
    }
}

export default PriceChart;