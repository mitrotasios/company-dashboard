import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: [],
            isLoading: true
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
        .then(response => this.setState({ listings: response }))
        .catch(error => { console.log('User', error.message)});
    }

    render() {
        return(
            <>
            <Switch>
                <Route exact path="/dashboard/selling-prices" 
                    component={() => (
                        <HomePage 
                            listings={this.state.listings}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Route path="/dashboard/make-distribution" 
                    component={() => (
                        <HomePage 
                            listings={this.state.listings}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Route path="/dashboard/contacts" 
                    component={() => (
                        <HomePage 
                            listings={this.state.listings}
                            isLoading={this.state.isLoading}
                            />
                    )}>
                </Route>
                <Route path="/dashboard/upload" 
                    component={() => (
                        <HomePage 
                            listings={this.state.listings}
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