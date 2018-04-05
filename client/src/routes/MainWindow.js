import React from "react"
import styled from "styled-components"
import { graphql } from "react-apollo"
import decode from "jwt-decode"

import Sidebar from "../containers/Sidebar/index.js"
import RoomHeader from "../components/MainView/RoomHeader"
import ChatWindow from "../components/MainView/ChatWindow"

import { allTeamsQuery } from "../graphql/queries/teams.js"

const LAST_ACTIVE_CHANNEL_KEY = "lastActiveChannelId"
const LAST_ACTIVE_TEAM_KEY = "lastActiveTeamId"

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

const getChannelFromLocalStorage = ({ id, channels }) => {
	const lastActiveTeamId = localStorage.getItem(LAST_ACTIVE_TEAM_KEY)
	const lastActiveChannelId = localStorage.getItem(LAST_ACTIVE_CHANNEL_KEY)

	if (parseInt(lastActiveTeamId, 10) !== id) {
		return channels[0]
	}

	const channelIndex = channels.findIndex(channel => channel.id === parseInt(lastActiveChannelId, 10))
	return channelIndex >= 0 ? channels[channelIndex] : channels[0]
}

const getActiveChannel = (team, channelId) => {
	if (channelId) {
		const channelIndex = team.channels.findIndex(channel => channel.id === parseInt(channelId, 10))

		if (channelIndex >= 0) {
			return team.channels[channelIndex]
		}
	}

	return getChannelFromLocalStorage(team)
}

const getActiveTeam = (teams, id) => {
	const teamIndex = id ? teams.findIndex(team => team.id === parseInt(id, 10)) : 0
	return teamIndex >= 0 ? teams[teamIndex] : teams[0]
}

const MainWindow = ({ data: { loading, allTeams }, match: { params } }) => {
	if (loading) return null

	const { user } = decode(localStorage.getItem("token"))

	console.log(user, allTeams);
	const team = getActiveTeam(allTeams, params.teamId)
	const currentChannel = getActiveChannel(team, params.channelId)

	localStorage.setItem(LAST_ACTIVE_TEAM_KEY, team.id)

	if (currentChannel) {
		localStorage.setItem(LAST_ACTIVE_CHANNEL_KEY, currentChannel.id)
	}

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

export default graphql(allTeamsQuery)(MainWindow)
