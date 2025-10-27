import pino from 'pino-http';

export const logger = pino({
	level: "info",
	customProps: (req, res) => {
		return {
			ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
			user: req.user?.username || "guest",
		}
	},
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
			translateTime: "HH:MM:ss",
			ignore: "pid,hostname",
			messageFormat: '{ip} {user} : {req.method} {req.url} {res.statusCode} - {responseTime}ms',
			hideObject: true,
		},
	},
})
