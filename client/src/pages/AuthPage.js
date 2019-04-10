import React, { Component } from 'react';
import { Row, Col, Container, Jumbotron, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import MyNav from '../components/MyNav';
import "./AuthPage.css"

export class AuthPage extends Component {
	render() {
		return (
			<div>
				<MyNav history={this.props.history} />			

				<Container >
					<Row>
						<Col>
							<Jumbotron className="login_jumbo">
								<h1>Login</h1>
								<br />
								<Form>
									<FormGroup>
										<Label for="exampleEmail">Email</Label>
										<Input type="email" name="email" id="exampleEmail"/>
									</FormGroup>
									<FormGroup>
										<Label for="examplePassword">Password</Label>
										<Input type="password" name="password" id="examplePassword"/>
									</FormGroup>
									<Button color="primary">Login</Button>
								</Form>
							</Jumbotron>
						</Col>
						<Col>
							<Jumbotron className="login_jumbo">
								<h1>Register</h1>
								<br />
								<Form>
									<FormGroup>
										<Label for="exampleEmail">Email</Label>
										<Input type="email" name="email" id="exampleEmail" />
									</FormGroup>
									<FormGroup>
										<Label for="examplePassword">Password</Label>
										<Input type="password" name="password" id="examplePassword" />
									</FormGroup>
									<FormGroup>
										<Label for="examplePassword">Password again</Label>
										<Input type="password" name="password" id="examplePassword" />
									</FormGroup>
									<Button color="primary">Register</Button>
								</Form>
							</Jumbotron>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default AuthPage;