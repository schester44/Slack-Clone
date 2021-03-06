import React from "react"
import ReactDOM from "react-dom"
import registerServiceWorker from "./registerServiceWorker"
import { ApolloProvider } from "react-apollo"

import Routes from "./routes"
import "semantic-ui-css/semantic.min.css"
import "./index.css"

import client from "./graphql/createClient"

const App = (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
)

ReactDOM.render(App, document.getElementById("root"))
registerServiceWorker()
