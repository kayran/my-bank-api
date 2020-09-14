const accounts = require('../model/accounts');

const createAccount = async (req, res, next) => {
	try {
		let {balance, name} = req.body;
		console.log('WE ARE HERE');
		console.log('req.body: ', req.body);
		console.log('req.body: ', balance, name);

		const accountId = await accounts.createAccount(name, balance);
		console.log();
		res.send({status: 200, data: {balance, name, accountId}});

		res.end();
	} catch (ex) {
		next(ex);
	}
};

const accountsList = async (req, res, next) => {
	try {
		const accountList = await accounts.listAccounts()
		res.send({status:200, data: accountList})
	} catch (ex) {
		next(ex);
	}
};

const accountDeposit = async (req, res, next) => {
	try {
		const {ammount, accountId} = req.body
		const account = await accounts.makeDeposit(ammount, accountId)
		res.send({status:200, data: {accountId, ...account}})
		res.end()
	} catch (ex) {
		next(ex);
	}
};

const accountWithdraw = async (req, res, next) => {
	try {
		const {ammount, accountId} = req.body
		const account = await accounts.makeWithdraw(ammount, accountId)
		res.send({status:200, data: {accountId, ...account}})
		res.end()
	} catch (ex) {
		next(ex);
	}
};

const accountBalance = async (req, res, next) => {
	try {
		const {accountId} = req.params;
		const account = await accounts.getAccount(+accountId)
		res.send({status:200, data: {accountId, ...account}})
		res.end()

	} catch (e) {
		next(e);
	}
}

const removeAccount = async (req, res, next) => {
	try {
		const {accountId} = req.params;
		const account = await accounts.removeAccount(+accountId)
		res.send({status:200, data: {accountId, ...account}})
		res.end()

	} catch (e) {
		next(e);
	}
}

const accountRoutes = {
	'/accounts/list': {'get': accountsList},
	'/accounts/create': {'post': createAccount},
	'/accounts/deposit': {'put': accountDeposit},
	'/accounts/withdraw': {'put': accountWithdraw},
	'/accounts/balance/:accountId': {'get': accountBalance},
	'/accounts/remove/:accountId': {'delete': removeAccount},
};
module.exports = {
	accountRoutes,
};