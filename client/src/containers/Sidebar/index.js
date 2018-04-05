import React, { Fragment, Component } from "react"
import { graphql } from "react-apollo"

import Teams from "./Teams"
import Channels from "./Channels"
import AddChannelModal from "./AddChannelModal"
import decode from "jwt-decode"

import { allTeamsQuery } from "../../graphql/queries/teams"

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			addChannelModalVisible: false
		}

		this.handleCreateChannelModalVisibility = this.handleCreateChannelModalVisibility.bind(this)
	}

	getActiveTeam() {
		const { data, currentTeamId } = this.props
		const { allTeams } = data

		const teamIndex = currentTeamId ? allTeams.findIndex(team => team.id === parseInt(currentTeamId, 10)) : 0
		return teamIndex >= 0 ? allTeams[teamIndex] : allTeams[0]
	}

	handleCreateChannelModalVisibility() {
		this.setState({ addChannelModalVisible: !this.state.addChannelModalVisible })
	}

	render() {
		const { data: { loading, allTeams } } = this.props

		if (loading) return null

		const { user } = decode(localStorage.getItem("token"))
		const team = this.getActiveTeam()

		return (
			<Fragment>
				<Teams teams={allTeams.map(t => ({ id: t.id, isActive: t.id === team.id, initials: t.name.charAt(0) }))} />

				<Channels
					teamId={team.id}
					teamName={team.name}
					username={user.username}
					channels={team.channels}
					onCreationChannelClick={this.handleCreateChannelModalVisibility}
					users={[{ id: 1, username: "slackbot" }, { id: 2, username: "bob" }]}
				/>

				<AddChannelModal
					teamId={team.id}
					onClose={this.handleCreateChannelModalVisibility}
					open={this.state.addChannelModalVisible}
				/>
			</Fragment>
		)
	}
}

export default graphql(allTeamsQuery)(Sidebar)
