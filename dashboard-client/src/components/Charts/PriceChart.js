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
            priceSum: 0,
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
        fetch('/api/listings?table=listings&avg=price')
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
        var priceSum = 0;
        this.props.listings.map(row => priceSum+=Number(row.price))
        var newSeries = [{values: data.map(row => Number(Number(row.avg).toFixed(2))), 'background-color': "rgba(43, 109, 247, 0.6)"}]
        var newScaleX = {labels: data.map(row => String(row.seller_type)), guide: {lineStyle: "dashed"}};

        this.setState({
            config: {...this.state.config, series: newSeries, scaleX: newScaleX},
            data: data,
            priceSum: priceSum,
            isLoading: false
        })
    }

    render() {
        return (
            this.state.isLoading ? (
                <>
                <div className="row kpis mt-2">
                    <div className="col-12 col-lg-6 col-xl-4 my-auto">
                        <div className="row">
                            <Skeleton height="100px" width="100%"/>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-4 my-auto ml-3">
                        <div className="row">
                            <Skeleton height="100px" width="100%"/>
                        </div>
                    </div>
                </div>
                <div className="row chart mt-2 text-center px-2">
                    <div className="col px-3">
                        <Skeleton height="40vh" width="100%"/>
                    </div>
                </div>
                </>
            ) : (
                <>
                <div className="row kpis">
                    <div className="col-12 col-lg-6 col-xl-4 primary-kpi my-auto">
                        <div className="row h-100">
                            <div className="col my-auto px-4">
                                <div>Average listing price</div>
                                <div><span className="KPI">{((this.state.priceSum)/this.props.listings.length).toFixed(2)} EUR</span> </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-4 secondary-kpi my-auto">
                        <div className="row h-100">
                            <div className="col my-auto px-4">
                                <div>Number of listings </div>
                                <div><span className="KPI">{this.props.listings.length}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row chart mt-2">
                    <ZingChart data={this.state.config} height={450}/>
                </div>
                </>
            )
        );
    }
}

export default PriceChart;