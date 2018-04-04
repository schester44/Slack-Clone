import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import Home from "./Home"
import Register from "./Auth/Register"

export const routes = {
    home: "/",
    auth: {
        register: "/auth/register"
    }
}

export default () => {
    return <Router>
				<Switch>
					<Route exact path={routes.home} component={Home} />
					<Route exact path={routes.auth.register} component={Register} />
				</Switch>
			</Router>
}