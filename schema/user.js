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

    type RegisterResponse {
        ok: Boolean!
        user: User
        errors: [Error!]
    }

    type Mutation {
        register(username: String, email: String!, password: String!): RegisterResponse!
    }
`