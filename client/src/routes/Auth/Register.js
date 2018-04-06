import React from "react"
import { routes } from "../../routes"
import UserRegistrationForm from "../../components/form/UserRegistrationForm"
import { Header, Grid } from "semantic-ui-react"

const Register = ({ history }) => {
	const handleSuccess = response => {
		history.push(routes.teams.gettingStarted)
	}

	return (
		<Grid style={{ height: "100%" }} verticalAlign="middle" textAlign="center">
			<Grid.Column style={{ maxWidth: "450px" }}>
				<Header as="h2" color="teal" textAlign="center">Sign Up</Header>
				<UserRegistrationForm onSuccess={handleSuccess} />
			</Grid.Column>
		</Grid>
	)
}

export default Register
