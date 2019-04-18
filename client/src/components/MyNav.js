import React, { Component } from 'react';
import './MyNav.css'
import { Card } from 'reactstrap';

export class MyNav extends Component {
	
	render_login_text = () => {
		if (sessionStorage.getItem("user") === "null" || sessionStorage.getItem("user") === null) return "Login / Register";
		return "I want to logout";
	}

	render_user = () => {
		if (sessionStorage.getItem("user") === "null" || !sessionStorage.getItem("user")) return null;
		return (
			<Card>
					<h5><b>{JSON.parse(sessionStorage.getItem("user")).username}</b></h5>
			</Card>
		)
	}

	render() {
		return (
			<div>
				<ul className="m_nav">
					{this.render_user()}
					<li
						className="m_nav_elem"
						onClick={() => this.props.history.push('/attack')}>
						Execute Attack
					</li>
					<li
						className="m_nav_elem"
						onClick={() => this.props.history.push('/records')}>
						Attack Records
					</li>
					<li
						className="m_nav_elem"
						onClick={() => this.props.history.push('/authentication')}>
						{this.render_login_text()}
					</li>
				</ul>
			</div>
		)
	}
}

export default MyNav;