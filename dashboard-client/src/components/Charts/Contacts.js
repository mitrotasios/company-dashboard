import React, { Component } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import './Charts.css'

class Contacts extends Component {
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
        var data = this.props.data;
        data.sort((a, b) => {
            if (a.contacts.length > b.contacts.length) return -1;
            if (a.contacts.length < b.contacts.length) return 1;
        }) 
        console.log(data)
        var newSeries = [{values: data.map(row => row.contacts.length).splice(0,10), 'background-color': "rgba(43, 109, 247, 0.6)"}]
        var newScaleX = [{labels: data.map(row => String(row.listing_id)+"ID").splice(0,10), guide: {lineStyle: "dashed"}}]
        this.setState({
            config: {...this.state.config, series: newSeries, scaleX: newScaleX}
        })
    }

    render() {
        return (
            <>
            <div className="row kpis mt-2">
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
            <div className="row chart mt-5">
                <ZingChart data={this.state.config}/>
            </div>
            {/* <div style={{"marginLeft":"-2vh"}} className="col chart">
                <ZingChart data={this.state.config}/>
            </div> */}
            </>
        );
    }
}

export default Contacts;