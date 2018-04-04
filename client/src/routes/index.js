import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import Home from "./Home"
import Register from "./Auth/Register"
import Login from "./Auth/Login"

export const routes = {
    home: "/",
    auth: {
        register: "/register",
        login: "/login"
    }
}

export default () => {
    return <Router>
				<Switch>
					<Route exact path={routes.home} component={Home} />
					<Route path={routes.auth.register} component={Register} />
					<Route path={routes.auth.login} component={Login} />
				</Switch>
			</Router>
}