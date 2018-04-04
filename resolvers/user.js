import { tryLogin, tryRegister } from "../auth"

export default {
	Query: {
		getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
		allUsers: (parent, args, { models }) => models.User.findAll()
	},
	Mutation: {
		login: async (parent, { email, password }, { models, SECRET, SECRET2 }) =>
			tryLogin(email, password, models, SECRET, SECRET2),
		register: async (parent, args, { models }) => tryRegister(args, models)
	}
}
