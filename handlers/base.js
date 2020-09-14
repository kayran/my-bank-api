const index = (req, res) => {

	res.send('Hello World!');
	res.end();
};

const baseRoutes = {
	'/': {'get': index},
};
module.exports = {
	baseRoutes,
};