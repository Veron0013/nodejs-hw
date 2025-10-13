import bcrypt from "bcrypt";
import createHttpError from "http-errors"

import { User } from "../models/user.js"
import { createSession, setSessionCookies } from "../services/auth.js";
import { Session } from "../models/session.js";

export const registerUser = async (req, res, next) => {

	if (!req.body?.email || !req.body?.password) {
		return next(createHttpError(400, 'Email and password required'))
	}
	const { email, password } = req.body

	const existingUser = await User.findOne({ email })

	if (existingUser) {
		return next(createHttpError(400, 'Email in use'))
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const newUser = await User.create({
		userName: email,
		email,
		password: hashedPassword
	})

	const newSession = await createSession(newUser._id)
	setSessionCookies(res, newSession)

	res.status(201).json({ newUser })
}


export const loginUser = async (req, res, next) => {
	if (!req.body?.email || !req.body?.password) {
		return next(createHttpError(400, 'Email and password required'))
	}

	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (!user) {
		return next(createHttpError(401, 'User not found'))
	}

	const isValidPassword = await bcrypt.compare(password, user.password)

	if (!isValidPassword) {
		return next(createHttpError(401, 'Invalid password'))
	}

	await Session.deleteOne({ userId: user._id })

	const newSession = await createSession(user._id)
	setSessionCookies(res, newSession)

	res.status(200).json(user)
}

export const logoutUser = async (req, res) => {
	const { sessionId } = req.cookies

	if (sessionId) {
		await Session.deleteOne({ _id: sessionId })
	}

	res.clearCookie('sessionId');
	res.clearCookie('accessToken');
	res.clearCookie('refreshToken');

	res.status(204).send();
}

export const refreshUserSession = async (req, res, next) => {

	if (!req.cookies?.sessionId || !req.cookies?.refreshToken) {
		return next(createHttpError(400, 'Error getting auth cookies'))
	}

	const { sessionId, refreshToken } = req.cookies

	const session = await Session.findOne({
		_id: sessionId,
		refreshToken
	})

	if (!session) {
		return next(createHttpError(401, 'Session not found'))
	}

	const isSessionExpired = new Date() > new Date(session.refreshTokenValidUntil)

	if (isSessionExpired) {
		return next(createHttpError(401, 'Token expired'))
	}

	await Session.deleteOne({
		_id: sessionId,
		refreshToken
	})

	const newSession = await createSession(session.userId)
	setSessionCookies(res, newSession)

	res.status(200).json({ message: 'Session refreshed', })
}