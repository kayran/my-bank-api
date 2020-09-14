/**
 * configuration for database
 * @type {{keyFilename: string, projectId: string}}
 */
var config = {
	projectId: 'bandalheira',
	keyFilename: './../DatastoreApiKey/key.json'
};


// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Datastore} = require('@google-cloud/datastore');

const moment = require('moment');

// Instantiate a datastore client
const datastore = new Datastore(config);

/**
 * Insert a visit record into the database.
 *
 * @param {object} data The data record to insert.
 * @param {string} entity The name of entity to save the item
 * @param {integer||boolean} keyValue The value for the key
 */
const insert = (data, entity, keyValue = false) => {
	let keyParams = keyValue ? [entity, keyValue] : entity;
	const key = datastore.key(keyParams);
	return datastore.save({key, data});
};

const remove = (entity, keyValue = false) => {
	let keyParams = keyValue ? [entity, keyValue] : entity;
	const key = datastore.key(keyParams);
	return datastore.delete(key);
};
/**
 * Gets a entity instance given the Key ID
 * @param entity: Name of the entity
 * @param entityId: Id of the item in entity
 * @returns {*}
 */
const getById = (entity, entityId) => {
	let keyParams = [entity, entityId];
	const key = datastore.key(keyParams);
	return datastore.get(key);
};

/**
 * query some items from a given entity
 * @param entity:
 * @param filter
 * @param orderBy field to order the response
 * @param order ascending or descending
 * @param limit
 * @returns {*}
 */
const query = (entity, filter, orderBy, order, limit) => {
	let query = datastore.createQuery(entity);
	if (filter) {
		const {field, operator = '=', value} = filter;
		query = query.filter(field, operator, value)
	}

	if (orderBy && order)
		query = query.order(orderBy, order);
	if (limit > 0)
		query = query.limit(limit);
	return datastore.runQuery(query);
};
const proccessItem = (item) => {
	item['key'] = item[datastore.KEY];
	return item
};
const proccessResult = result => {
	if (!result) return [];

	if(result[0])
		result = result[0].map(proccessItem);
	else result = proccessItem(result)
	return result
};

const mapById = result => {
	const resultMapped = {};
	for (let item of result) {
		resultMapped[item['key'].id] = item;
	}
	return resultMapped;
};

const putMulti = entities => {
	datastore.save(entities);
};

/**
 * Retrieve the latest 10 visit records from the database.
 */
const getVisits = () => {
	return query('visit', undefined, 'timestamp', {descending: true}, 10);
};

const getCreatedAtNowData = () => {
	return moment().format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
	proccessResult,
	insert,
	remove,
	query,
	getById,
	mapById,
	getVisits,
	putMulti,
	getCreatedAtNowData
};