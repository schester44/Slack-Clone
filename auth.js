import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginFailResponse = { ok: false, errors: [{ path: "default", message: "Invalid email and/or password" }] }

export const createTokens = ({ id }, secret, refreshSecret) => {
	const createToken = jwt.sign(
		{
			user: { id }
		},
		secret,
		{
			expiresIn: "30m"
		}
	)

	const createRefreshToken = jwt.sign(
		{
			user: { id }
		},
		refreshSecret,
		{
			expiresIn: "7d"
		}
	)

	return Promise.all([createToken, createRefreshToken])
}

export const tryRegister = async (args, models) => {
	try {
		const user = await models.User.create(args)
		return {
			ok: true,
			user
		}
	} catch ({ errors }) {
		return {
			ok: false,
			errors: errors.map(({ path, message }) => ({ path, message }))
		}
	}
}

export const tryLogin = async (email, password, models, SECRET, SECRET2) => {
	const user = await models.User.findOne({ where: { email }, raw: true })

	if (!user) {
		return loginFailResponse
	}

	const valid = await bcrypt.compare(password, user.password)

	if (!valid) {
		return loginFailResponse
	}

	const [token, refreshToken] = await createTokens(user, SECRET, user.password + SECRET2)
	return { ok: true, token, refreshToken }
}
