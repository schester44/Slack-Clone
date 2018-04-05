import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { onError } from "apollo-link-error"

import { HttpLink } from "apollo-link-http"
import { ApolloLink } from "apollo-link"

const AuthLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            'x-token': localStorage.getItem("token"),
            'x-refresh-token': localStorage.getItem('refreshToken')
        }
    })
    
    return forward(operation).map((response) => {
        const context = operation.getContext()
        const { response: { headers } } = context

        if (headers) {
            const token = headers.get('x-token')
            const refreshToken = headers.get('x-refresh-token')

            if (token) {
                localStorage.setItem('token', token)
            }

            if (refreshToken) {
                localStorage.setItem("refreshToken", refreshToken)                
            }
        }

        return response
    })
})

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    // TODO, handle errors
})

const link = ApolloLink.from([
    onErrorLink,
    AuthLink,
	new HttpLink({
		uri: "http://10.16.14.95:3333/graphql"
	}),
])

const cache = new InMemoryCache()

const client = new ApolloClient({ link, cache})

export default client
