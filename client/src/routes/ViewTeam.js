import React from "react"
import styled from "styled-components"
import Teams from "../components/MainView/Teams"
import Channels from "../components/MainView/Channels"
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

const ViewTeam = () => {

	const channelName = "general"

	return (
		<App>
			<Teams teams={[{ id: 1, initials: 'TA'}, { id: 1, initials: "MB"}]} />
			<Channels
				teamName="Random Team"
				username="My Username"
				channels={[{ id: 1, name: "general" }, { id: 2, name: "random" }]}
				users={[{id: 1, username: "slackbot"}, { id: 2, username: "bob"}]}
			/>
			<div className="main">
				<RoomHeader channelName={channelName} />
				<ChatWindow channelName={channelName} />
			</div>
		</App>
	)
}

export default ViewTeam
