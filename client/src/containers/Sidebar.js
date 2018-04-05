import React, { Fragment } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import Teams from "../components/MainView/Teams"
import Channels from "../components/MainView/Channels"
import decode from "jwt-decode"

const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
	if (loading) return null

	const teamIndex = allTeams.findIndex(team => team.id === currentTeamId)
    
	const team = teamIndex >= 0 ? allTeams[teamIndex] : allTeams[0]

	const { user } = decode(localStorage.getItem("token"))

	return (
		<Fragment>
			<Teams
				teams={allTeams.map(team => ({
					id: team.id,
					isActive: team.id === currentTeamId,
					initials: team.name.charAt(0)
				}))}
			/>

			<Channels
				teamName={team.name}
				username={user.username}
				channels={team.channels}
				users={[{ id: 1, username: "slackbot" }, { id: 2, username: "bob" }]}
			/>
		</Fragment>
	)
}
const allTeamsQuery = gql`
	{
		allTeams {
			id
			name
			channels {
				id
				name
			}
		}
	}
`

export default graphql(allTeamsQuery)(Sidebar)
