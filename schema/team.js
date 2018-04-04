export default `
    type User {
        id: Int!
        username: String!
        email: String!
        messages: Message!
        teams: [Team!]!
    }

    type Mutation {
        createTeam(name: String!): Boolean!
    }
`