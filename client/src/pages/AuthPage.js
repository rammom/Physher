import React, { Component } from 'react';
import { Row, Col, Container, Jumbotron, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import MyNav from '../components/MyNav';
import "./AuthPage.css"
import axios from "axios";

import ErrorFlash from "../components/ErrorFlash";

export class AuthPage extends Component {


	state = {
		login: {
			username: "",
			password: "",
			error: "",
		},
		register: {
			username: "",
			password: "",
			password2: "",
			error: "",
		}
	}

	onLoginChange = (e) => {
		let login = this.state.login;
		login[e.target.name] = e.target.value;
		this.setState({ login });
	}

	onRegisterChange = (e) => {
		let register = this.state.register;
		register[e.target.name] = e.target.value;
		this.setState({ register });
	}

	login = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3010/auth/login', this.state.login)
			.then(res => {
				let login = this.state.login;
				login.error = "";
				this.setState({ login });
				sessionStorage.setItem("user", JSON.stringify(res.data.user));
				this.forceUpdate();
			})
			.catch(err => {
				let login = this.state.login;
				login.error = "Invalid credentials";
				this.setState({ login });
				sessionStorage.setItem("user", null);
				this.forceUpdate();
			});
	}

	register = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3010/auth/register', this.state.register)
			.then(res => {
				let register = this.state.register;
				register.error = "";
				this.setState({ register });
				sessionStorage.setItem("user", JSON.stringify(res.data.user));
				this.forceUpdate();
			})
			.catch(err => {
				let register = this.state.register;
				register.error = "Username taken or passwords don't match";
				this.setState({ register });
				sessionStorage.setItem("user", null);
				this.forceUpdate();
			});
	} 

	logout = (e) => {
		axios.post('http://localhost:3010/auth/logout')
			.then(res => {
				sessionStorage.setItem("user", null);
				this.forceUpdate();
			})
			.catch(err => {
				console.log(err);
				//sessionStorage.setItem("user", null);
			});
	}

	gen_login_register = () => {
		if (sessionStorage.getItem("user") === "null" || sessionStorage.getItem("user") === null){
			return (
				<div>
					<Row>
						<Col>
							<Jumbotron className="login_jumbo">
								<h1>Login</h1>
								<br />
								<ErrorFlash message={this.state.login.error}/>
								<Form onSubmit={this.login}>
									<FormGroup>
										<Label>Username</Label>
										<Input type="text" name="username" value={this.state.login.username} onChange={this.onLoginChange} />
									</FormGroup>
									<FormGroup>
										<Label>Password</Label>
										<Input type="password" name="password" value={this.state.login.password} onChange={this.onLoginChange} />
									</FormGroup>
									<Button color="primary" type="submit">Login</Button>
								</Form>
							</Jumbotron>
						</Col>
						<Col>
							<Jumbotron className="login_jumbo">
								<h1>Register</h1>
								<br />
								<ErrorFlash message={this.state.register.error}/>
								<Form onSubmit={this.register}>
									<FormGroup>
										<Label>Username</Label>
										<Input type="text" name="username" value={this.state.register.username} onChange={this.onRegisterChange} />
									</FormGroup>
									<FormGroup>
										<Label>Password</Label>
										<Input type="password" name="password" value={this.state.register.password} onChange={this.onRegisterChange} />
									</FormGroup>
									<FormGroup>
										<Label>Password again</Label>
										<Input type="password" name="password2" value={this.state.register.password2} onChange={this.onRegisterChange} />
									</FormGroup>
									<Button color="primary" type="submit">Register</Button>
								</Form>
							</Jumbotron>
						</Col>
					</Row>
				</div>
			)
		}
		return (
			<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
				<Button color="danger" onClick={this.logout}>Logout</Button>
			</div>
		)
	}

	render() {
		return (
			<div>
				<MyNav history={this.props.history} />			

				<Container >
					{this.gen_login_register()}
				</Container>
			</div>
		)
	}
}

export default AuthPage;