import { createResolver } from "apollo-resolvers"
import { createError, isInstance } from "apollo-errors"

const UnkownError = createError("UnknownError", {
	message: "An unknown error has occurred!"
})

export const baseResolver = createResolver(
	null,
	(root, args, context, error) => (isInstance(error) ? error : new UnkownError())
)
