import React from 'react';
import { Route, Redirect } from "react-router-dom"
import { isAuthenticated } from '../../utils/is-authenticated'
import { routes } from "../index"

const GuestRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (!isAuthenticated() ? <Component {...props} /> : <Redirect to={routes.team} />)} />
)

export default GuestRoute
