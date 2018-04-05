import React, { Component } from "react"
import { Modal, Form, Button } from "semantic-ui-react"
import { graphql } from "react-apollo"
import { createChannelMutation } from "../../graphql/mutations/channels"
import { allTeamsQuery } from "../../graphql/queries/teams"

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

		this.setChannelVisibility = this.setChannelVisibility.bind(this)
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

	setChannelVisibility(isPublic = false) {
		this.setState({ fields: { ...this.state.fields, isPublic } })
	}

	async handleSubmission() {
		this.setState({ isSubmitting: true })

		const { teamId, name } = this.state.fields

		const response = await this.props.mutate({
			variables: { teamId, name },
			optimisticResponse: {
				__typename: "Mutation",
				createChannel: {
					__typename: "Mutation",
					ok: true,
					channel: {
						__typename: "Channel",
						id: -1,
						name
					}
				}
			},
			update: (store, { data: { createChannel } }) => {
				const { ok, channel } = createChannel
				if (!ok) return

				const data = store.readQuery({ query: allTeamsQuery })
				const teamIndex = data.allTeams.findIndex(t => t.id === teamId)

				data.allTeams[teamIndex].channels.push(channel)
				store.writeQuery({ query: allTeamsQuery, data })
			}
		})

		if (response.data.createChannel) {
			this.props.onClose()
			this.setState({
				...initialState,
				fields: {
					...this.state.fields,
					...initialState.fields
				}
			})
		} else {
			// TODO: Report error
		}
	}

	render() {
		const { open, onClose } = this.props
		const { isSubmitting, fields } = this.state
		const { name, isPublic } = fields

		return (
			<Modal size="tiny" open={open} onClose={onClose}>
				<Modal.Header>Start A New Channel</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field style={{ textAlign: "center" }}>
							<label>Channel Type</label>
							<Button.Group>
								{isPublic ? (
									<Button compact positive onClick={() => this.setChannelVisibility(true)}>
										Public
									</Button>
								) : (
									<Button compact onClick={() => this.setChannelVisibility(true)}>
										Public
									</Button>
								)}
								<Button.Or />
								{isPublic ? (
									<Button compact onClick={() => this.setChannelVisibility(false)}>
										Private
									</Button>
								) : (
									<Button compact positive onClick={() => this.setChannelVisibility(false)}>
										Private
									</Button>
								)}
							</Button.Group>

							<p style={{ marginTop: 3, color: "rgba(211, 211, 211,1.0)" }}>
								Public channels can be joined by anyone on your team
							</p>
						</Form.Field>

						<Form.Field required={true}>
							<label>Name your channel</label>
							<input
								type="text"
								name="name"
								value={name}
								placeholder="e.g. Marketing, Sales, Development"
								onChange={this.handleInputChange}
							/>
						</Form.Field>

						<Form.Field>
							<label>Add others to your channel</label>
							<input type="text" placeholder="Type a name or email id to add a person" />
						</Form.Field>

						<Button disabled={name.length === 0 || isSubmitting} onClick={this.handleSubmission} fluid positive>
							Create Channel
						</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default graphql(createChannelMutation)(AddChannelModal)
