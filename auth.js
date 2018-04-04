import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginFailResponse = { ok: false, errors: [{ path: "default", message: "Invalid email and/or password" }] }

export const formatErrors = (error, models) => {
	if (error instanceof models.sequelize.ValidationError) {
		return error.errors.map(({ path, message }) => ({ path, message }))
	}

	return { path: "name", message: "something went wrong" }
}

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

export const tryRegister = async ({ password, ...rest }, models) => {
	try {
		if (password.length < 4 || password.length > 100) {
			return {
				ok: false,
				errors: [
					{
						path: "password",
						message:
							password.length < 4
								? "Your password must be more than 4 characters"
								: "Your password must be less than 100 characters"
					}
				]
			}
		}

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
