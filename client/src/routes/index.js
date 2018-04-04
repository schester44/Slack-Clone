import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import Home from "./Home"

export const routes = {
    home: "/"
}

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path={routes.home} component={Home}></Route>
            </Switch>
        </Router>

    );
}