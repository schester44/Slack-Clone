export default `
    type Team {
        owner: User!
        members: [User!]!
        channels: [Channel!]!
    }

    type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
    }

    type Mutation {
        createUser(username: String, email: String!, password: String!): User!
    }
`