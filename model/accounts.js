const datastore = require('./model');
const entity = 'my-bank-api-account';

const listAccounts = async () => {
	return datastore.proccessResult(await datastore.query(entity));
};

const createAccount = async (name, balance) => {
	const createdAt = datastore.getCreatedAtNowData();

	const data = {
		name,
		balance,
		createdAt,
	};
	const result = await datastore.insert(data, entity);
	return result[0]['mutationResults'][0].key.path[0].id;
};

const getAccount = async (accountId) => {
	return (await datastore.getById(entity, accountId))['0'];
};

const removeAccount = async (accountId) => {
	return (await datastore.remove(entity, accountId))['0'];
};

const updateAccount = async (accountData, accountId) => {
	await datastore.insert(accountData, entity, accountId);
};

const makeDeposit = async (ammount, accountId) => {
	const account = await getAccount(accountId);
	account.balance += ammount;
	await updateAccount(account, accountId);
	return account;
};

const makeWithdraw = async (ammount, accountId) => {
	const account = await getAccount(accountId);
	account.balance -= ammount;
	await updateAccount(account, accountId);
	return account;
};

module.exports = {
	createAccount,
	listAccounts,
	getAccount,
	updateAccount,
	makeDeposit,
	makeWithdraw,
	removeAccount,
};