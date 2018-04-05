import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import { Message, Segment, Form, Button } from "semantic-ui-react"

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

		const errorKeys = Object.keys(errors)
		const errorsExist = errorKeys.length > 0

		return (
			<Form size={this.props.formSize || "large"}>
				{errorsExist && (
					<Message size="tiny" color="black">
						<Message.Header>There were some errors with your submission.</Message.Header>
						{errorKeys.map(key => <p key={key}>{errors[key]}</p>)}
					</Message>
				)}

				<Segment stacked>
					<Form.Field error={!!errors.username}>
						<Form.Input
							size="large"
							type="text"
							icon="user"
							iconPosition="left"
							name="username"
							value={username}
							placeholder="Username"
							onChange={this.handleInputChange}
						/>
					</Form.Field>

					<Form.Field error={!!errors.email}>
						<Form.Input
							size="large"
							type="email"
							icon="at"
							iconPosition="left"
							name="email"
							value={email}
							placeholder="Email"
							onChange={this.handleInputChange}
						/>
					</Form.Field>

					<Form.Field error={!!errors.password}>
						<Form.Input
							size="large"
							icon="lock"
							iconPosition="left"
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={this.handleInputChange}
						/>
					</Form.Field>

					<Button
						fluid
						size="large"
						disabled={password.length < 4 || email.length === 0 || username.length === 0}
						type="submit"
						onClick={this.handleSubmit}
					>
						Sign Up
					</Button>
				</Segment>
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
