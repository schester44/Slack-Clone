import React from "react"
import styled from "styled-components"

import UserStatusBubble from "../UserStatusBubble"
import { Icon } from "semantic-ui-react"

const Wrapper = styled.div`
	width: 200px;
	height: 100%;
	background: rgba(78, 88, 107, 1);
	padding: 10px 20px;
	color: #999;
`
const Header = styled.div`
	margin-bottom: 20px;

	h2,
	h5 {
		margin: 0;
		padding: 0;
	}

	h2 {
		font-size: 16px;
		color: white;
	}

	h5 {
		font-weight: 100;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.8);
	}
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
			padding: 1px 0px 1px 10px;
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
			<Header>
				<h2>{teamName}</h2>
				<h5>
					<Icon name="time" style={{ color: "yellow" }} />
					{username}
				</h5>
			</Header>

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
