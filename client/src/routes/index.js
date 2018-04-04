import React from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import Home from "./Home"
import Register from "./Auth/Register"
import Login from "./Auth/Login"
import CreateTeam from "./CreateTeam"

export const routes = {
	home: "/",
	auth: {
		register: "/register",
		login: "/login"
	},
	teams: {
		create: "/create-team"
	}
}

export default () => {
	return (
		<Router>
			<Switch>
				<Route exact path={routes.home} component={Home} />
				<Route path={routes.auth.register} component={Register} />
				<Route path={routes.auth.login} component={Login} />
				<Route path={routes.teams.create} component={CreateTeam} />
			</Switch>
		</Router>
	)
}
