import createHttpError from "http-errors"
import { Session } from "../models/session"
import { User } from "../models/user"


export const authentificate = (error, req) => {

	const { accessToken } = req.cookies

	if (!accessToken) {
		return createHttpError(401, 'Missing access token')
	}

	const session = Session.findOne({ accessToken })

	if (!session) {
		return createHttpError(401, 'Session not found')
	}

	const tokenValid = session.accessTokenValidUntil >= Date.now()

	if (!tokenValid) {
		return createHttpError(401, 'Access token expired')
	}

	const user = User.findById(session.userId)

	if (!user) {
		return createHttpError(401, 'Access token expired')
	}


}