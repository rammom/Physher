import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';

export class Routes extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/authentication" component={AuthPage} />

					<Route path="/*" component={ErrorPage} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes;