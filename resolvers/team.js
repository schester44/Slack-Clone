import { isAuthenticatedResolver } from "../auth/permissions"
import { createError } from "apollo-errors"

const NoTeamsExistError = createError("NoTeamsExistError", {
	message: `You haven't created a team yet`
})

export default {
	Query: {
		allTeams: isAuthenticatedResolver.createResolver(
			async (parent, args, { models: { Team }, user }) => {
				const teams = await Team.findAll({ where: { owner: user.id } }, { raw: true })
				if (teams.length === 0) throw new NoTeamsExistError()
				return teams
			})
	},
	Mutation: {
		addTeamMember: isAuthenticatedResolver.createResolver(async (parent, { email, teamId }, { models, user }) => {
			const userToAdd = await models.User.findOne({ where: { email } }, { raw: true })

			if (!userToAdd) {
				// TODO: Send Email invite to register. Should contain some sort of callback that can be used to join the teamID
				console.log("user does not exist, email them a sign up")

				return { ok: false, errors: [{ path: "invite-email", message: "function not implemented" }] }
				return
			}

			try {
				await models.Member.create({ userId: userToAdd.id, teamId })
				return { ok: true }
			} catch ({ errors }) {
				return { ok: false, errors: errors.map(({ path, message }) => ({ path, message })) }
			}
		}),
		createTeam: isAuthenticatedResolver.createResolver(async (parent, args, { models, user }) => {
			try {
				const team = await models.Team.create({ ...args, owner: user.id })
				await models.Channel.create({ name: "general", public: true, teamId: team.id })

				return {
					ok: true,
					team
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
