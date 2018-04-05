import React from "react"
import styled from "styled-components"
import Sidebar from "../containers/Sidebar"
import RoomHeader from "../components/MainView/RoomHeader"
import ChatWindow from "../components/MainView/ChatWindow"

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

const ViewTeam = ({ match: { params }}) => {

	const channelName = "general"
	const currentTeamId = params.teamId

	return (
		<App>
			<Sidebar currentTeamId={currentTeamId} />
			<div className="main">
				<RoomHeader channelName={channelName} />
				<ChatWindow channelName={channelName} />
			</div>
		</App>
	)
}

export default ViewTeam
