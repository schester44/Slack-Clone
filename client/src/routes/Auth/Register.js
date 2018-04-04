import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { routes } from "../../routes"

import { Container, Header, Form, Button } from "semantic-ui-react"
import FieldError from "../../components/Form/FieldError"

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: {
				error: "",
				value: ""
			},
			password: {
				error: "",
				value: ""
			},
			email: {
				error: "",
				value: ""
			}
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange({ target: { name, value } }) {
		this.setState({ [name]: { value, error: "" } })
	}

	async handleSubmit() {
		const { username, password, email } = this.state

		const response = await this.props.mutate({
			variables: {
				username: username.value,
				email: email.value,
				password: password.value
			}
		})

		const { ok, errors } = response.data.register

		if (ok) {
			this.props.history.push(routes.home)
		} else {
			this.setState(oldState => this.setErrorStates(oldState, errors))
		}
	}

	setErrorStates(oldState, errors) {
		const state = { ...oldState }

		errors.forEach(({ path, message }) => {
			if (state[path]) {
				state[path].error = message
			}
		})

		return state
	}

	render() {
		const { username, email, password } = this.state

		return (
			<Container>
				<Header as="h1">Register</Header>
				<Form>
					<Form.Field error={username.error.length > 0}>
						<label>
							Username <FieldError error={username.error} />
						</label>
						<input
							size="large"
							type="text"
							name="username"
							value={username.value}
							placeholder="Username"
							onChange={this.handleInputChange}
						/>
					</Form.Field>
					<Form.Field error={email.error.length > 0}>
						<label>
							Email <FieldError error={email.error} />
						</label>
						<input
							size="large"
							type="email"
							name="email"
							value={email.value}
							placeholder="Email"
							onChange={this.handleInputChange}
						/>
					</Form.Field>
					<Form.Field error={password.error.length > 0}>
						<label>
							Password <FieldError error={password.error} />
						</label>
						<input
							size="large"
							type="password"
							name="password"
							value={password.value}
							placeholder="Password"
							onChange={this.handleInputChange}
						/>
					</Form.Field>

					<Button type="submit" onClick={this.handleSubmit}>
						Sign Up
					</Button>
				</Form>
			</Container>
		)
	}
}

const registerMutation = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			ok
			errors {
				path
				message
			}
		}
	}
`

export default graphql(registerMutation)(Register)
