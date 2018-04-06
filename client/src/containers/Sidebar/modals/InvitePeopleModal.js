import React, { Component } from "react"
import { Modal, Form, Button } from "semantic-ui-react"
import { graphql } from "react-apollo"
import { addTeamMemberMutation } from "../../../graphql/mutations/teams"

const initialState = {
	fields: {
		name: "",
		isPublic: true
	},
	isSubmitting: false
}

class AddChannelModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			fields: {
				teamId: props.teamId,
				email: ""
			},
			isSubmitting: false,
			invitedFriends: []
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmission = this.handleSubmission.bind(this)
	}

	handleInputChange({ target: { name, value } }) {
		this.setState({
			fields: {
				...this.state.fields,
				[name]: value
			}
		})
	}

	async handleSubmission() {
		this.setState({ isSubmitting: true })

		const { teamId, email } = this.state.fields

		const response = await this.props.mutate({ variables: { teamId, email } })
		
		const { ok, errors } = response.data.addTeamMember
		
		if (ok) {
			this.setState({
				invitedFriends: [...this.state.invitedFriends, email],
				isSubmitting: false,
				fields: { ...this.state.fields, email: "" }
			})
			
			// this.props.onClose()
		
		} else {
			// TODO: Show friendly error
		}
	}

	render() {
		const { open, onClose } = this.props
		const { isSubmitting, fields } = this.state
		const { email } = fields

		return (
			<Modal size="tiny" open={open} onClose={onClose}>
				<Modal.Header>Invite People to Your Team</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<input
								value={email}
								type="email"
								onChange={this.handleInputChange}
								name="email"
								placeholder="johnny@example.com"
							/>
						</Form.Field>

						<Button disabled={email.length === 0 || isSubmitting} onClick={this.handleSubmission} fluid positive>
							Invite User
						</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default graphql(addTeamMemberMutation)(AddChannelModal)
