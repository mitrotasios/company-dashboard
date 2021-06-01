import React, { Component } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import './Charts.css'

class PriceChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        var privateS = this.props.data.filter(row => {if (row.seller_type == "private") this.state.pSum += row.price; return row.price;})
        var dealer = this.props.data.filter(row => {if (row.seller_type == "dealer") this.state.dSum += row.price; return row.price;})
        var other = this.props.data.filter(row => {if (row.seller_type == "other") this.state.oSum += row.price; return row.price;})
        var newSeries = [{values: [this.state.pSum/privateS.length, this.state.dSum/dealer.length, this.state.oSum/other.length], 'background-color': "rgba(43, 109, 247, 0.6)"}]
        this.setState({
            config: {...this.state.config, series: newSeries}
        })
    }

    render() {
        return (
            <>
            <div className="row kpis">
                <div className="col-12 col-lg-6 col-xl-3 primary-kpi my-auto">
                    <div className="row h-100">
                        <div className="col my-auto px-4">
                            <div>Average listing price</div>
                            <div><span className="KPI">{((this.state.pSum+this.state.dSum+this.state.oSum)/this.props.data.length).toFixed(2)} EUR</span> </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-3 secondary-kpi my-auto">
                    <div className="row h-100">
                        <div className="col my-auto px-4">
                            <div>Number of listings </div>
                            <div><span className="KPI">{this.props.data.length}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row chart">
                <ZingChart data={this.state.config}/>
            </div>
            {/* <div style={{"marginLeft":"-2vh"}} className="col chart">
                <ZingChart data={this.state.config}/>
            </div> */}
            </>
        );
    }
}

export default PriceChart;