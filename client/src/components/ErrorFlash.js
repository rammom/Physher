import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export class ErrorFlash extends Component {

	gen_alert = () => {
		if (!this.props.message || this.props.message.length === 0) return null;
		return (
			<Alert color="danger">
				{this.props.message}
			</Alert>
		)
		
	}

	render() {
		return (
			<div>
				{this.gen_alert()}
			</div>
		)
	}
}

export default ErrorFlash;
