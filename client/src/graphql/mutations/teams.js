import gql from "graphql-tag"

export const addTeamMemberMutation = gql`
	mutation($email: String!, $teamId: Int!) {
		addTeamMember(email: $email, teamId: $teamId) {
			ok
			errors {
				path
				message
			}
		}
	}
`
