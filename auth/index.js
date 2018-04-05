import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginFailResponse = { ok: false, errors: [{ path: "default", message: "Invalid email and/or password" }] }

const getRefreshSecret = ({ user, secret }) => user.password + secret

export const createTokens = async ({ id, username }, secret, refreshSecret) => {
	const createToken = await jwt.sign(
		{
			user: { id, username }
		},
		secret,
		{
			expiresIn: "30m"
		}
	)

	const createRefreshToken = await jwt.sign(
		{
			user: { id }
		},
		refreshSecret,
		{
			expiresIn: "7d"
		}
	)

	return [createToken, createRefreshToken]
}

export const refreshTokens = async (token, refreshToken, models, SECRET, SECRET2) => {
	let userId = 0

	try {
		const { user: { id } } = jwt.decode(refreshToken)
		userId = id
	} catch (err) {
		return {}
	}

	if (!userId) {
		return {}
	}

	const user = await models.User.findOne({ where: { id: userId }, raw: true })

	if (!user) {
		return {}
	}

	const refreshSecret = getRefreshSecret({ user, secret: SECRET2 })

	try {
		jwt.verify(refreshToken, refreshSecret)
	} catch (err) {
		return {}
	}

	const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret)

	return {
		token: newToken,
		refreshToken: newRefreshToken,
		user
	}
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

	const [token, refreshToken] = await createTokens(user, SECRET, getRefreshSecret({ user, secret: SECRET2 }))
	return { ok: true, token, refreshToken }
}
