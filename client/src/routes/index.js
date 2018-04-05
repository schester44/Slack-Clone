import React from "react"
import { Redirect, Switch, Route, BrowserRouter as Router } from "react-router-dom"
import decode from "jwt-decode"

import Home from "./Home"
import Register from "./Auth/Register"
import Login from "./Auth/Login"
import CreateTeam from "./CreateTeam"
import MainWindow from "./MainWindow"
import GettingStarted from "./GettingStarted"

export const routes = {
	home: "/",
	team: "/view-team",
	gettingStarted: "/getting-started",
	auth: {
		register: "/register",
		login: "/login",
		recoverPassword: "/reset-password"
	},
	teams: {
		create: "/create-team"
	}
}

const isAuthenticated = () => {
	const token = localStorage.getItem("token")
	const refreshToken = localStorage.getItem("refreshToken")

	try {
		decode(token)
		decode(refreshToken)
	} catch (error) {
		return false
	}

	return true
}

export const GuestRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (!isAuthenticated() ? <Component {...props} /> : <Redirect to={routes.team} />)} />
)

export const PrivateRoute = ({ component: Component, ...rest }) => (
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

export default () => {
	return (
		<Router>
			<Switch>
				<Route exact path={routes.home} component={Home} />
				<GuestRoute path={routes.auth.register} component={Register} />
				<GuestRoute path={routes.auth.login} component={Login} />
				<PrivateRoute path={`${routes.team}/:teamId?/:channelId?`} component={MainWindow} />
				<PrivateRoute path={routes.gettingStarted} component={GettingStarted} />
				<PrivateRoute path={routes.teams.create} component={CreateTeam} />
			</Switch>
		</Router>
	)
}
