import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { routes } from "../../routes"

import { Message, Container, Form, Button, Header } from "semantic-ui-react"

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
			<Container>
				<Header as="h1">Login</Header>

				{error.length > 0 && <Message color="red">{error}</Message>}

				<Form>
					<Form.Field>
						<label>Email</label>
						<input
							size="large"
							type="text"
							name="email"
							value={email.value}
							placeholder="Email"
							onChange={this.handleInputChange}
						/>
					</Form.Field>

					<Form.Field>
						<label>Password</label>
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
						Login
					</Button>
				</Form>
			</Container>
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
