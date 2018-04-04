import React from "react"
import ReactDOM from "react-dom"
import registerServiceWorker from "./registerServiceWorker"

import Routes from "./routes"

import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

import "semantic-ui-css/semantic.min.css"

const client = new ApolloClient({
	link: new HttpLink({ uri: "http://localhost:3333/graphql" }),
	cache: new InMemoryCache()
})

const App = (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
)

ReactDOM.render(App, document.getElementById("root"))
registerServiceWorker()
