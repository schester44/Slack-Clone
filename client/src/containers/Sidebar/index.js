import React, { Fragment, Component } from "react"

import Teams from "./Teams"
import Channels from "./Channels"
import AddChannelModal from "./AddChannelModal"

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			addChannelModalVisible: false
		}

		this.handleCreateChannelModalVisibility = this.handleCreateChannelModalVisibility.bind(this)
	}

	handleCreateChannelModalVisibility() {
		this.setState({ addChannelModalVisible: !this.state.addChannelModalVisible })
	}

	render() {
		const { user, teams, currentTeam } = this.props

		return (
			<Fragment>
				<Teams teams={teams.map(t => ({ id: t.id, isActive: t.id === currentTeam.id, initials: t.name.charAt(0) }))} />

				<Channels
					teamId={currentTeam.id}
					teamName={currentTeam.name}
					username={user.username}
					channels={currentTeam.channels}
					onCreationChannelClick={this.handleCreateChannelModalVisibility}
					users={[{ id: 1, username: "slackbot" }, { id: 2, username: "bob" }]}
				/>

				<AddChannelModal
					teamId={currentTeam.id}
					onClose={this.handleCreateChannelModalVisibility}
					open={this.state.addChannelModalVisible}
				/>
			</Fragment>
		)
	}
}

export default Sidebar
