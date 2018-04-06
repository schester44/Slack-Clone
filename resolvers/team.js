import { isAuthenticatedResolver } from "../auth/permissions"
import { createError } from "apollo-errors"

export default {
	Query: {
		allTeams: isAuthenticatedResolver.createResolver(async (parent, args, { models: { Team }, user }) =>
			Team.findAll({ where: { owner: user.id } }, { raw: true })
		),
		inviteTeams: isAuthenticatedResolver.createResolver(async (parent, args, { models: { Team, User }, user }) =>
			Team.findAll(
				{
					include: [
						{
							model: User,
							where: { id: user.id }
						}
					]
				},
				{ raw: true }
			)
		)
	},
	Mutation: {
		addTeamMember: isAuthenticatedResolver.createResolver(async (parent, { email, teamId }, { models, user }) => {
			const userToAdd = await models.User.findOne({ where: { email } }, { raw: true })

			if (!userToAdd) {
				// TODO: Send Email invite to register. Should contain some sort of callback that can be used to join the teamID
				// TODO -- Prevent spamming use, if sent more than once within X days, don't send again.
				console.log("user does not exist, email them a sign up")

				return { ok: false, errors: [{ path: "invite-email", message: "function not implemented" }] }
			}

			try {
				// How to handle inviting ppl who are already invited?.. and why are we creating a member? maybe the user doesn't want to be a member? I think this stuff shouldn't happen until the user accepts the `invite`
				await models.Member.create({ userId: userToAdd.id, teamId })
				return { ok: true }
			} catch ({ errors }) {
				return { ok: false, errors: errors.map(({ path, message }) => ({ path, message })) }
			}
		}),
		createTeam: isAuthenticatedResolver.createResolver(async (parent, args, { models, user }) => {
			try {
				const response = await models.sequelize.transaction(async () => {
					const team = await models.Team.create({ ...args, owner: user.id })
					await models.Channel.create({ name: "general", public: true, teamId: team.id })
					return team
				})

				return {
					ok: true,
					team: response
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
