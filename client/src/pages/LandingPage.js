import React, { Component } from 'react';
import MyNav from '../components/MyNav';
import "./LandingPage.css"

export class LandingPage extends Component {
	render() {
		return (
			<div>
				<MyNav history={this.props.history}/>
				<div className="main_text">
					<h1 className="title">
						Physher
					</h1>
					<span className="text">
						Create an account or sign in to start a phishing attack!
					</span>
				</div>
			</div>
		)
	}
}

export default LandingPage;