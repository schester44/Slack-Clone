import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { routes } from "../routes"

import { Message, Container, Form, Button, Header } from "semantic-ui-react"

class CreateTeam extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			error: ""
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange({ target: { name, value } }) {
		this.setState({ error: "", [name]: value })
	}

	async handleSubmit() {
		const { name } = this.state
		let response = null

		try {
			response = await this.props.mutate({ variables: { name } })
		} catch (error) {
			this.props.history.push(routes.auth.login)
			return
		}

		const { ok, errors, team } = response.data.createTeam

		if (ok) {
			this.props.history.push(`${routes.team}/${team.id}`)
		} else {
			this.setState({ error: errors[0].message })
		}
	}

	render() {
		const { name, error } = this.state

		return (
			<Container>
				<Header as="h1">Create Team</Header>
				{error.length > 0 && <Message color="red">{error}</Message>}

				<Form>
					<Form.Field error={!!error}>
						<label>Team Name</label>
						<input
							size="large"
							type="text"
							name="name"
							value={name.value}
							placeholder="Team Name"
							onChange={this.handleInputChange}
						/>
					</Form.Field>

					<Button type="submit" onClick={this.handleSubmit}>
						Create Team
					</Button>
				</Form>
			</Container>
		)
	}
}

const creationTeamMutation = gql`
	mutation($name: String!) {
		createTeam(name: $name) {
			ok
			team {
				id
			}
			errors {
				path
				message
			}
		}
	}
`

export default graphql(creationTeamMutation)(CreateTeam)
