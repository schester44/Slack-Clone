import { requiresAuth } from "../auth/permissions"

export default {
	Mutation: {
		createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
			try {
				await models.Team.create({ ...args, owner: user.id })
				return {
					ok: true
				}
			} catch ({ errors }) {
				return { ok: false, errors: errors.map(({ path, message }) => ({ path, message })) }
			}
		})
	}
}
