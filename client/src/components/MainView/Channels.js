import React from "react"
import styled from "styled-components"

import UserInfo from "./UserInfo"
import UserStatusBubble from "../UserStatusBubble"
import { Icon } from "semantic-ui-react"

const Wrapper = styled.div`
	width: 200px;
	height: 100%;
	background: rgba(78, 88, 107, 1);
	padding: 8px 0 0 15px;;
	color: #999;
`

const List = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	margin-bottom: 20px;

	li {
		margin: 0;
		padding: 1px 0;

		&:not(.heading):hover {
			cursor: pointer;
			color: rgba(180, 180, 180, 1);
		}

		&.heading {
			text-transform: uppercase;
		}

		&:not(.heading) {
			padding: 1px 0px;
		}
	}
`

const channel = ({ id, name }) => (
	<li key={`channel-${id}`}>
		<Icon style={{ color: "rgba(142, 142, 142, 0.5)" }} name="hashtag" />
		{name}
	</li>
)

const user = ({ id, username }) => (
	<li key={`user-${id}`}>
		<UserStatusBubble />
		{username}
	</li>
)

const Channels = ({ teamName, username, channels, users }) => {
	return (
		<Wrapper>
			<UserInfo teamName={teamName} username={username} />

			<List>
				<li className="heading">Channels</li>
				{channels.map(channel)}
			</List>

			<List>
				<li className="heading">Direct Messages</li>
				{users.map(user)}
			</List>
		</Wrapper>
	)
}

export default Channels
