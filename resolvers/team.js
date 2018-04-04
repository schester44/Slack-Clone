export default {
	Mutation: {
		createTeam: async (parent, args, { models, user }) => {
			try {
				await models.Team.create({ ...args, owner: user.id })
				return {
					ok: true
				}
			} catch ({ errors }) {
				return { ok: false, errors: errors.map(({ path, message }) => ({ path, message })) }
			}
		}
	}
}
