import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import { Container, Form, Button } from "semantic-ui-react"

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			email: ""
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange({ target }) {
		this.setState({ [target.name]: target.value })
	}

    async handleSubmit() {
        const response = await this.props.mutate({
            variables: this.state
        })

        console.log(response);
	}

    render() {
        const { username, email, password } = this.state

		return (
			<Container>
				<Form>
					<Form.Field>
						<label>Username</label>
						<input
							type="text"
							name="username"
							value={username}
							placeholder="Username"
							onChange={this.handleInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							onChange={this.handleInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={this.handleInputChange}
						/>
					</Form.Field>

					<Button type="submit" onClick={this.handleSubmit}>Sign Up</Button>
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
