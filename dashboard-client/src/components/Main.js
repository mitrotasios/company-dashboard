import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('/api/listings')
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
        .then(response => this.setState({data: response}))
        .catch(error => { console.log('User', error.message)});
    } 

    addData(newData) {
        var oldData = this.state.data;
        this.setState({
            data: [...oldData, newData]
        })
    }

    render() {
        return(
            <>
            <Switch>
                <Route exact path="/dashboard/selling-prices" 
                    component={() => (
                        <HomePage 
                            data={this.state.data}
                            addData={this.addData}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Route path="/dashboard/make-distribution" 
                    component={() => (
                        <HomePage 
                            data={this.state.data}
                            addData={this.addData}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Route path="/dashboard/contacts" 
                    component={() => (
                        <HomePage 
                            data={this.state.data}
                            addData={this.addData}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Route path="/dashboard/upload" 
                    component={() => (
                        <HomePage 
                            data={this.state.data}
                            addData={this.addData}
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