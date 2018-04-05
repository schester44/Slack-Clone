import React from "react"
import { graphql } from "react-apollo"
import { allUsersQuery } from "../graphql/queries/users"

import { Redirect } from "react-router-dom"

const Home = ({ data: { error, loading, allUsers } }) => {
	return loading ? null : error ? <Redirect to="/login" /> : allUsers.map(user => <h1 key={user.id}>{user.email}</h1>)
}

export default graphql(allUsersQuery)(Home)
