import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import UserInfo from "./UserInfo"
import { routes } from "../../routes"
import UserStatusBubble from "../../components/UserStatusBubble"
import { Icon } from "semantic-ui-react"

const Wrapper = styled.div`
	width: 200px;
	height: 100%;
	background: rgba(78, 88, 107, 1);
	padding: 8px 0 0 15px;
	color: #999;
	overflow-y: auto;
`

const List = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	margin-bottom: 20px;

	a {
		color: #999;
	}

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

const InviteButton = styled.button`
	border: 0;
	padding: 2px 4px;
	border-radius: 5px;
	background: #e0e1e2;
	width: 40px;
	height: 20px;
	color: rgba(0, 0, 0, 0.6);
	font-size: 0.78571429rem;
	cursor: pointer;
	outline: none;
`

const user = ({ id, username }) => (
	<li key={`user-${id}`} style={{ display: "flex" }}>
		<div style={{ position: "relative", marginRight: 3 }}>
			<img src={`http://i.pravatar.cc/30?img=${id}`} alt="profile" />
			<div style={{ position: "absolute", bottom: 1, right: "-4px" }}>
				<UserStatusBubble />
			</div>
		</div>
		{username}
	</li>
)

const Channels = ({ teamId, teamName, username, channels, users, onCreationChannelClick, onInvitePeopleClick }) => {
	return (
		<Wrapper>
			<div style={{ display: "flex", justifyContent: "space-between", paddingRight: 5 }}>
				<h5 style={{ color: "rgba(211,211,211,1.0)" }}>{teamName}</h5>
				<InviteButton onClick={onInvitePeopleClick}>Invite</InviteButton>
			</div>

			<UserInfo teamName={teamName} username={username} />

			<List>
				<li className="heading">
					Channels
					<Icon
						onClick={onCreationChannelClick}
						link={true}
						style={{ marginLeft: 2, cursor: "pointer" }}
						name="plus circle"
					/>
				</li>
				{channels.map(({ id, name }, idx) => (
					<Link key={`channel-${id}`} to={`${routes.team}/${teamId}/${id}`}>
						<li>
							<Icon style={{ color: "rgba(142, 142, 142, 0.5)" }} name="hashtag" />
							{name}
						</li>
					</Link>
				))}
			</List>

			<List>
				<li className="heading">Direct Messages</li>
				{users.map(user)}
			</List>
		</Wrapper>
	)
}

export default Channels
