import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import MyNav from '../components/MyNav';

export class RecordPage extends Component {

	state = {
		user: null,
	}

	async componentDidMount() {
		let usr = await sessionStorage.getItem("user");
		this.setState({user: JSON.parse(usr)});
	}

	gen_cards = () => {
		if (sessionStorage.getItem("user") === "null" || sessionStorage.getItem("user") === null){
			return (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<h4>Please login first</h4>
				</div>
			)
		}
		let user = this.state.user;
		if (user === null) return null;

		console.log(user);
		let attacks = user.attacks;
		let cards = [];
		console.log(attacks);
		for (let i = 0; i < attacks.length; ++i){
			let to_list = [];
			let attack = attacks[i];
			for (let j = 0; j < attack.to.length; ++j) {
				to_list.push(
					<li key={j}>
						{attack.to[j]} ({(attack.clicked.indexOf(attack.to[j]) !== -1) ? <span style={{color: "green"}}>clicked</span> : <span style={{color: "red"}}>not clicked</span>})
					</li>
				)
			}
			cards.push(
				<Card key={attack._id}>
					<CardBody>
						<CardTitle>
							{attack.title}
						</CardTitle>
						<ul>
							{to_list}
						</ul>
					</CardBody>
				</Card>
			)
		}
		return cards;
	}

	render() {
		return (
			<div>
				<MyNav history={this.props.history} />			

				<Container>
					{this.gen_cards()}
				</Container>
			</div>
		)
	}
}

export default RecordPage;