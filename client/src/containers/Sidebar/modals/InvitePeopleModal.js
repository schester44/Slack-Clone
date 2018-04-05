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
				name: "",
				isPublic: true
			},
			isSubmitting: false
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

		const { teamId, name } = this.state.fields

		const response = await this.props.mutate({
			variables: { teamId, name }
		})

		if (response.data.createChannel) {
			this.props.onClose()
		} else {
			// TODO: Report error
		}
	}

	render() {
		const { open, onClose } = this.props
		const { isSubmitting, fields } = this.state
		const { name } = fields

		return (
			<Modal size="tiny" open={open} onClose={onClose}>
				<Modal.Header>Invite People</Modal.Header>
				<Modal.Content>
					<Form>
						<Button disabled={name.length === 0 || isSubmitting} onClick={this.handleSubmission} fluid positive>
							Send Invites
						</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default graphql(addTeamMemberMutation)(AddChannelModal)
