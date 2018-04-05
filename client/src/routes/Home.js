import React from "react"
import { graphql } from "react-apollo"
import { allUsersQuery } from "../graphql/queries/users"

const Home = ({ data: { loading, allUsers } }) => {
	return loading ? null : allUsers.map(user => <h1 key={user.id}>{user.email}</h1>)
}

export default graphql(allUsersQuery)(Home)
