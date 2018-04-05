import { tryLogin, tryRegister } from "../auth"
import { isAuthenticatedResolver } from "../auth/permissions"

export default {
	Query: {
		getUser: isAuthenticatedResolver.createResolver((parent, { id }, { models }) =>
			models.User.findOne({ where: { id } })
		),
		allUsers: isAuthenticatedResolver.createResolver((parent, args, { models }) => models.User.findAll())
	},
	Mutation: {
		login: async (parent, { email, password }, { models, SECRET, SECRET2 }) =>
			tryLogin(email, password, models, SECRET, SECRET2),
		register: async (parent, args, { models }) => tryRegister(args, models)
	}
}
