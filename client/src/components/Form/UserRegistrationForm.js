import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import { Form, Button } from "semantic-ui-react"
import FieldError from "./FieldError"

class UserRegistrationForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			fields: {
				username: "",
				password: "",
				email: ""
			},
			errors: {}
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	setErrorStates(allErrors) {
		const errors = {}

		allErrors.forEach(({ path, message }) => {
			errors[path] = message
		})

		this.setState({ errors })
	}

	async handleSubmit() {
		const { username, email, password } = this.state.fields

		const response = await this.props.mutate({ variables: { username, email, password } })

		const { ok, errors } = response.data.register

		if (ok) {
			this.props.onSuccess(response.data.register)
		} else {
			this.setErrorStates(errors)
		}
	}

	handleInputChange({ target: { name, value } }) {
		this.setState({
			fields: {
				...this.state.fields,
				[name]: value
			}
		})
	}

	render() {
		const { errors, fields } = this.state
		const { username, email, password } = fields

		return (
			<Form>
				<Form.Field error={!!errors.username}>
					<label>
						Username <FieldError error={errors.username} />
					</label>
					<input
						size="large"
						type="text"
						name="username"
						value={username}
						placeholder="Username"
						onChange={this.handleInputChange}
					/>
				</Form.Field>
				<Form.Field error={!!errors.email}>
					<label>
						Email <FieldError error={errors.email} />
					</label>
					<input
						size="large"
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						onChange={this.handleInputChange}
					/>
				</Form.Field>
				<Form.Field error={!!errors.password}>
					<label>
						Password <FieldError error={errors.password} />
					</label>
					<input
						size="large"
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						onChange={this.handleInputChange}
					/>
				</Form.Field>

				<Button
					disabled={password.length < 4 || email.length === 0 || username.length === 0}
					type="submit"
					onClick={this.handleSubmit}
				>
					Sign Up
				</Button>
			</Form>
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

export default graphql(registerMutation)(UserRegistrationForm)
