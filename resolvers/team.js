import { requiresAuth } from "../auth/permissions"

export default {
	Query: {
		allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
			models.Team.findAll({ where: { owner: user.id } }, { raw: true })
		)
	},
	Mutation: {
		createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
			try {
				const team = await models.Team.create({ ...args, owner: user.id })
				await models.Channel.create({ name: "general", public: true, teamId: team.id })
				
				return {
					ok: true,
					team,
				}
			} catch ({ errors }) {
				return { ok: false, errors: errors.map(({ path, message }) => ({ path, message })) }
			}
		})
	},
	Team: {
		channels: ({ id }, args, { models, user }) => models.Channel.findAll({ where: { teamId: id } })
	}
}
