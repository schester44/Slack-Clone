import React from "react"
import { Route, Redirect } from "react-router-dom"
import { isAuthenticated } from "../../utils/is-authenticated"
import { routes } from "../index"

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: routes.auth.login, state: { from: props.location } }} />
			)
		}
	/>
)

export default PrivateRoute