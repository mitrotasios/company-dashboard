import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: [],
            isLoading: true
        }
    }

    render() {
        return(
            <>
            <Switch>
                <Route exact path="/dashboard/selling-prices" 
                    component={() => (
                        <HomePage 
                            data={this.state.data}
                            fetchData={this.fetchData}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Route path="/dashboard/make-distribution" 
                    component={() => (
                        <HomePage 
                            data={this.state.data}
                            fetchData={this.fetchData}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Route path="/dashboard/contacts" 
                    component={() => (
                        <HomePage 
                            data={this.state.data}
                            fetchData={this.fetchData}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Route path="/dashboard/upload" 
                    component={() => (
                        <HomePage 
                            data={this.state.data}
                            fetchData={this.fetchData}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Redirect to="/dashboard/selling-prices" />
            </Switch>
            </>
        );
    }
}

export default Main;