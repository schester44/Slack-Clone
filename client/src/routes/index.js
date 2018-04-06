import React from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import Home from "./Home"
import Register from "./Auth/Register"
import Login from "./Auth/Login"
import CreateTeam from "./CreateTeam"
import MainWindow from "./MainWindow"
import GettingStarted from "./GettingStarted"
import GuestRoute from "./wrappers/GuestRoute"
import PrivateRoute from "./wrappers/PrivateRoute"

export const routes = {
	home: "/",
	team: "/view-team",
	auth: {
		register: "/register",
		login: "/login",
		recoverPassword: "/reset-password"
	},
	teams: {
		gettingStarted: "/getting-started",
		create: "/create-team"
	}
}

export default () => {
	return (
		<Router>
			<Switch>
				<Route exact path={routes.home} component={Home} />
				<GuestRoute path={routes.auth.register} component={Register} />
				<GuestRoute path={routes.auth.login} component={Login} />
				<PrivateRoute path={`${routes.team}/:teamId?/:channelId?`} component={MainWindow} />
				<PrivateRoute path={routes.teams.gettingStarted} component={GettingStarted} />
				<PrivateRoute path={routes.teams.create} component={CreateTeam} />
			</Switch>
		</Router>
	)
}
