import React, { Component } from 'react';
import './MyNav.css'

export class MyNav extends Component {
	render() {
		return (
			<ul className="m_nav">
				<li
					className="m_nav_elem"
					onClick={() => this.props.history.push('/execute')}>
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
					Login / Register
				</li>
			</ul>
		)
	}
}

export default MyNav;