import React, { Component } from 'react';
import MyNav from "../components/MyNav";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, FormText, Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import axios from "axios";
import ErrorFlash from "../components/ErrorFlash";
import SuccessFlash from "../components/SuccessFlash";

import t_UoW from "../templates/UoW.json";
import t_Netflix from "../templates/Netflix.json";
import t_Interac from "../templates/Interac.json";
import t_Sherif from "../templates/Sherif.json";


export class AttackPage extends Component {

	state = {
		from_name: "",
		from_email: "",
		to_emails: "",
		cc_emails: "",
		bcc_emails: "",
		subject: "",
		body_html: "",
		error: "",
		success: "",
		sent: false
	}

	defaultState = () => {
		return {
			from_name: "",
			from_email: "",
			to_emails: "",
			cc_emails: "",
			bcc_emails: "",
			subject: "",
			body_html: "",
			error: "",
			success: "",
		}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	createAttackRecord = async () => {
		let date = new Date();
		let from = this.state.from_email;
		let to = this.state.to_emails.split(",");
		let title = `${from}_${date.getTime()}`;

		let retval = null;
		await axios.post('http://localhost:3010/api/create_attack_record', {date, from, to, title})
			.then(res => {
				console.log(res);
				if (res.status !== 200) {
					this.setState({error: "error saving attack records."});
				}
				console.log(res.data);
				console.log(res);
				retval = res.data.record_id;
			})
			.catch(err => {
				console.log(err);
				this.setState({ error: "error saving attack records. emails sent" });
			});

		return retval;
	}

	sendmail = async (e) => {
		e.preventDefault();

		let record_id = await this.createAttackRecord();
		console.log(record_id);

		await axios.post('http://localhost:3010/api/sendmail', {...this.state, record_id})
			.then(res => {
				if (res.status !== 200){
					console.log("error");
					this.setState({error: "email(s) failed to send!"});
				}
				else {
					console.log(res);
					let st = this.state;
					st = this.defaultState();
					st.success = "email(s) sent!";
					this.setState(st);
				}

			})
			.catch(err => {
				console.log(err);
				this.setState({ error: "email(s) failed to send!" });
			});
	}

	setUoW = () => {
		console.log('UoW');
		let st = this.state;
		st.from_email = t_UoW.from;
		st.subject = t_UoW.subject;
		st.body_html = t_UoW.html;
		this.setState(st);
	}
	setNetflix = () => {
		console.log('Netflix');
		let st = this.state;
		st.from_email = t_Netflix.from;
		st.subject = t_Netflix.subject;
		st.body_html = t_Netflix.html;
		this.setState(st);
	}
	setInterac = () => {
		console.log('Interac');
		let st = this.state;
		st.from_email = t_Interac.from;
		st.subject = t_Interac.subject;
		st.body_html = t_Interac.html;
		this.setState(st);
	}
	setSherif = () => {
		console.log('Sherif');
		let st = this.state;
		st.from_email = t_Sherif.from;
		st.from_name = t_Sherif.name ? t_Sherif.name : "";
		st.subject = t_Sherif.subject ? t_Sherif.subject : "";
		st.body_html = t_Sherif.html;
		this.setState(st);
	}

	gen_attack_forms = () => {
		if (sessionStorage.getItem("user") === "null" || sessionStorage.getItem("user") === null){
			return (
				<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
					<h4>Please login first</h4>
				</div>
			)
		}

		return (
			<div>
				<Row>
					<Col>
						<Card>
							<CardBody>
								<ErrorFlash message={this.state.error} />
								<SuccessFlash message={this.state.success} />
								<h4> Create custom email </h4>
								<hr />
								<Form onSubmit={this.sendmail}>
									<FormGroup>
										<Label>From Name:</Label>
										<Input type="text" name="from_name" value={this.state.from_name} onChange={this.onChange} />
									</FormGroup>
									<FormGroup>
										<Label>From:</Label>
										<Input type="email" name="from_email" value={this.state.from_email} onChange={this.onChange} required/>
									</FormGroup>
									<FormGroup>
										<Label>To:</Label>
										<Input type="text" name="to_emails" value={this.state.to_email} onChange={this.onChange}/>
										<FormText color="muted">
											Emails separated by commas
										</FormText>
									</FormGroup>
									<FormGroup>
										<Label>Cc:</Label>
										<Input type="text" name="cc_emails" value={this.state.cc_emails} onChange={this.onChange} />
										<FormText color="muted">
											Emails separated by commas
										</FormText>
									</FormGroup>
									<FormGroup>
										<Label>Bcc:</Label>
										<Input type="text" name="bcc_emails" value={this.state.bcc_emails} onChange={this.onChange} />
										<FormText color="muted">
											Emails separated by commas
										</FormText>
									</FormGroup>
									<FormGroup>
										<Label>Subject:</Label>
										<Input type="text" name="subject" value={this.state.subject} onChange={this.onChange} />
									</FormGroup>
									<FormGroup>
										<Label>HTML body:</Label>
										<Input type="textarea" name="body_html" value={this.state.body_html} onChange={this.onChange}/>
									</FormGroup>
									<Button color="primary">Send Email(s)</Button>
								</Form>
							</CardBody>
						</Card>
					</Col>
					<Col sm="12" md="4">
						<Card>
							<CardBody>
								<h4> Select from our templates </h4>
								<hr />
								<Row>
									<Card onClick={this.setUoW} className="template_card">
										<CardBody>
											<CardTitle>
												UoW IT Services
											</CardTitle>
											<CardImg width="100%" src="http://www.uwindsor.ca/sites/all/themes/uwindsor_bootstrap/images/uwindsor_shield.svg" />
										</CardBody>
									</Card>
								</Row>
								<br />
								<Row>
									<Card onClick={this.setNetflix} className="template_card">
										<CardBody>
											<CardTitle>
												Netflix
											</CardTitle>
											<CardImg width="100%" src="http://cdn.nflximg.com/us/email/logo/newDesign/logo_v2.png" />
										</CardBody>
									</Card>
								</Row>
								<br />
								<Row>
									<Card onClick={this.setInterac} className="template_card">
										<CardBody>
											<CardTitle>
												Interac
											</CardTitle>
											<CardImg width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/InteracLogo.svg/2000px-InteracLogo.svg.png" />
										</CardBody>
									</Card>
								</Row>
								<br />
								<Row>
									<Card onClick={this.setSherif} className="template_card">
										<CardBody>
											<CardTitle>
												Dr. Sherif Saad
											</CardTitle>
											<CardImg width="100%" src="http://www.uwindsor.ca/science/computerscience/sites/uwindsor.ca.science.computerscience/files/sherif_saad_headshot.jpg" />
										</CardBody>
									</Card>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}

	render() {
		return (
			<div>
				<MyNav history={this.props.history} />			

				<Container>
					{this.gen_attack_forms()}
				</Container>
			</div>
		)
	}
}

export default AttackPage;