import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import { Message, Container, Form, Button, Header } from "semantic-ui-react"

class CreateTeam extends Component {
	constructor(props) {
		super(props)

		this.state = {
            teamName: "",
            error: ""
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange({ target: { name, value } }) {
		this.setState({ error: "", [name]: value })
	}

	async handleSubmit() {
		const { teamName } = this.state

		const response = await this.props.mutate({variables: { teamName }})

		const { ok,  errors } = response.data.login

		if (ok) {
            // todo
        } else {
			this.setState({ error: errors[0].message })
		}
	}

	render() {
		const { teamName, error } = this.state

		return (
			<Container>
				<Header as="h1">Create Team</Header>

				{error.length > 0 && <Message color="red">{error}</Message>}

				<Form>
					<Form.Field>
						<label>Team Name</label>
						<input
							size="large"
							type="text"
							name="teamName"
							value={teamName.value}
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

const creationMutation = gql`
	mutation($name: String!) {
		createTeam(name: $name) {
			ok
			errors {
				message
			}
		}
	}
`

export default graphql(creationMutation)(CreateTeam)
