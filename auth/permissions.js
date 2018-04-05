import { createError } from "apollo-errors"
import { baseResolver } from "./baseResolver"

const ForbiddenError = createError('ForbiddenError', {
    path: 'authentication',
    message: 'This action is forbidden'
})

const AuthenticationRequiredError = createError("AuthenticationRequiredError", {
	path: "authentication",
	message: "You must be logged in to do this"
})

export const isAuthenticatedResolver = baseResolver.createResolver((root, args, { user }) => {
    if (!user || !user.id) throw new AuthenticationRequiredError()
})