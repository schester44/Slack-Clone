import bcrypt from "bcrypt"
import formatErrors from "./utils/format-errors"

export default {
	Query: {
		getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
		allUsers: (parent, args, { models }) => models.User.findAll()
	},
	Mutation: {
		register: async (parent, { password, ...rest }, { models }) => {
			try {
				const hashedPassword = await bcrypt.hash(password, 12)
				const user = await models.User.create({ ...rest, password: hashedPassword })
				return {
					ok: true,
					user
				}
			
			} catch (err) {
				return {
					ok: false,
					errors: formatErrors(err, models)
				}
			}
		}
	}
}
