import path from "path"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import { makeExecutableSchema } from "graphql-tools"
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas"

import models from "./models"
import { refreshTokens } from "./auth"

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, "./resolvers")))

export const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()

const graphqlEndpoint = "/graphql"

const SECRET = "amchaha35najcja3n2bahac"
const SECRET2 = "xj2h2n2njsjshdhxxx"

const addUser = async (req, res, next) => {
	const token = req.headers["x-token"]

	if (token) {
		try {
			const { user } = jwt.verify(token, SECRET)
			req.user = user
		} catch (err) {
			const refreshToken = req.headers["x-refresh-token"]
			const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2)
			
			if (newTokens.token && newTokens.refreshToken) {
				res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token")
				res.set("x-token", newTokens.token)
				res.set("x-refresh-token", newTokens.refreshToken)
			}
			
			req.user = newTokens.user
		}
	}

	next()
}

app.use(addUser)

app.use(
	graphqlEndpoint,
	cors(),
	bodyParser.json(),
	graphqlExpress(req => {
		console.log(req.user);

		return {
			schema,
			context: {
				models,
				user: req.user,
				SECRET,
				SECRET2
			}
		}
	})
)

app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }))

models.sequelize.sync().then(() => {
	app.listen(3333)
})
