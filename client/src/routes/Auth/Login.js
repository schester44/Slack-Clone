import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { routes } from "../../routes"

import { Link } from "react-router-dom"

import { Grid, Segment, Message, Form, Button, Header } from "semantic-ui-react"

class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			fields: {
				email: "",
				password: ""
			},
			error: ""
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange({ target: { name, value } }) {
		this.setState({
			error: "",
			fields: {
				...this.state.fields,
				[name]: value
			}
		})
	}

	async handleSubmit() {
		const { email, password } = this.state.fields

		const response = await this.props.mutate({ variables: { email, password } })

		const { ok, token, refreshToken, errors } = response.data.login

		if (ok) {
			localStorage.setItem("token", token)
			localStorage.setItem("refreshToken", refreshToken)
			const previousRoute = ((this.props.location.state || {}).from || {}).pathname
			this.props.history.push(previousRoute || routes.home)
		} else {
			this.setState({ error: errors[0].message })
		}
	}

	render() {
		const { fields: { email, password }, error } = this.state

		return (
			<Grid style={{ height: "100%" }} verticalAlign="middle" textAlign="center">
				<Grid.Column style={{ maxWidth: "450px" }}>
					<Header as="h2" color="teal" textAlign="center">
						Sign In
					</Header>

					<Form size="large">
						{error.length > 0 && (
							<Message size="tiny" color="red">
								<Message.Header>{error}</Message.Header>
							</Message>
						)}

						<Segment stacked>
							<Form.Input
								size="large"
								type="email"
								icon="at"
								iconPosition="left"
								name="email"
								value={email.value}
								placeholder="Email"
								onChange={this.handleInputChange}
							/>

							<Form.Input
								size="large"
								icon="lock"
								iconPosition="left"
								type="password"
								name="password"
								value={password.value}
								placeholder="Password"
								onChange={this.handleInputChange}
							/>

							<Button
								fluid
								size="large"
								disabled={password.length === 0 || email.length === 0}
								type="submit"
								onClick={this.handleSubmit}
							>
								Sign In
							</Button>
							<Link to={routes.auth.recoverPassword}>
								<p style={{ textAlign: "right", fontSize: 10, marginTop: 10 }}>Forgot Password?</p>
							</Link>
						</Segment>
					</Form>

					<Message style={{ background: "transparent" }}>
						New to us? <Link to={routes.auth.register}>Sign Up</Link>
					</Message>
				</Grid.Column>
			</Grid>
		)
	}
}

const loginMutation = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			ok
			token
			refreshToken
			errors {
				message
			}
		}
	}
`

export default graphql(loginMutation)(Login)
