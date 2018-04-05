import React from "react"
import { routes } from "../routes"
import { Link } from "react-router-dom"
import {  Grid, Header } from "semantic-ui-react"

const GettingStarted = () => {
	return (
		<Grid style={{ height: "100%" }} verticalAlign="middle" textAlign="center">
			<Grid.Column style={{ maxWidth: "450px" }}>
				<Header as="h1">Get started with a Team</Header>
				<p>
					Everything in <span style={{ color: "green" }}>mock</span> begins with a Team. A team is blah blah blah
				</p>
            
            <p>Join An Existing Team</p>    
                <Link to={routes.teams.create} style={{ fontSize: 28 }}>Create A New Team</Link>    
			</Grid.Column>
		</Grid>
	)
}

export default GettingStarted
