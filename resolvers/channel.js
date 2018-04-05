import { isAuthenticatedResolver } from "../auth/permissions"

export default {
	Mutation: {
		createChannel: isAuthenticatedResolver.createResolver(async (parent, args, { models }) => {
			try {
				const channel = await models.Channel.create(args)
				return {
					ok: true,
					channel
				}
			} catch ({ errors }) {
				return {
					ok: false,
					errors: errors.map(({ path, message }) => {
						path, message
					})
				}
			}
		})
	}
}
