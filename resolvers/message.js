import { isAuthenticatedResolver } from "../auth/permissions"

export default {
	Mutation: {
		createMessage: isAuthenticatedResolver.createResolver(async (parent, args, { models, user }) => {
			try {
				await models.Message.create({ ...args, userId: user.id })
				return true
			} catch (err) {
				console.log(err)
				return false
			}
		})
	}
}
