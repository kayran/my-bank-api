const router = require('express').Router();

const {accountRoutes} = require('./accounts');
const {baseRoutes} = require('./base');

const routes = {...accountRoutes, ...baseRoutes};

for (const route in routes) {
	if (!routes.hasOwnProperty(route)) continue;
	const handlers = routes[route];

	for (const method in handlers) {
		if (!handlers.hasOwnProperty(method)) continue;
		const handler = handlers[method];

		router[method](route, handler);
	}
}

router.use(function (req, res, next) {
	console.info('Time:', Date.now());
	next();
});

module.exports = router;