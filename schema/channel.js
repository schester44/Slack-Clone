export default `
    type Channel {
        id: Int!
        name: String!
        public: Boolean!
        message: [Message!]!
    }

    type CreateChannelResponse {
        ok: Boolean!
        channel: Channel!
        team: Team!
        errors: [Error!]
    }

    type Mutation {
        createChannel(teamId: Int!, name: String!, public: Boolean=false): CreateChannelResponse!
    }
`
