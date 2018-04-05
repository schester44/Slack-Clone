import React from "react"
import { routes } from "../../routes"
import UserRegistrationForm from "../../components/Form/UserRegistrationForm"
import { Container, Header } from "semantic-ui-react"

const Register = ({ history }) => {
	const handleSuccess = response => {
		history.push(routes.home)
	}

	return (
		<Container>
			<Header as="h1">Register</Header>
			<UserRegistrationForm onSuccess={handleSuccess} />
		</Container>
	)
}

export default Register
