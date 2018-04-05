import React, { Component } from "react"
import styled from "styled-components"
import { graphql } from "react-apollo"
import decode from "jwt-decode"

import { routes } from "./index"

import Sidebar from "../containers/Sidebar/index.js"
import RoomHeader from "../components/MainView/RoomHeader"
import ChatWindow from "../components/MainView/ChatWindow"

import { allTeamsQuery } from "../graphql/queries/teams.js"

const App = styled.div`
	display: flex;
	height: 100%;

	.main {
		width: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
`

const getActiveChannel = (team, channelId) => {
	const channelIndex = channelId ? team.channels.findIndex(channel => channel.id === parseInt(channelId, 10)) : 0
	return team.channels[channelIndex]
}

const getActiveTeam = (teams, id) => {
	const teamIndex = id ? teams.findIndex(team => team.id === parseInt(id, 10)) : 0
	return teamIndex >= 0 ? teams[teamIndex] : teams[0]
}

class MainWindow extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps({ data }) {
		if (data.error && data.error.graphQLErrors) {
			data.error.graphQLErrors.forEach((error) => {
				if (error.name === "AuthenticationRequiredError") {
					this.props.history.push(routes.auth.login)
					return;
				}

				if (error.name === "NoTeamsExistError") {
					this.props.history.push(routes.teams.create)
					return;
				 }
			 })
		}

	}

	render() {
		const { data: { loading, allTeams }, match: { params } } = this.props

		if (loading || !allTeams || allTeams.length === 0) return null

		const { user } = decode(localStorage.getItem("token"))

		const team = getActiveTeam(allTeams, params.teamId)
		const currentChannel = getActiveChannel(team, params.channelId)

		return (
			<App>
				<Sidebar user={user} teams={allTeams} channel={currentChannel} currentTeam={team} />
				<div className="main">
					<RoomHeader channel={currentChannel} />
					<ChatWindow channel={currentChannel} />
				</div>
			</App>
		)
	}
}

export default graphql(allTeamsQuery)(MainWindow)
