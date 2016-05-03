var util = require('util');
var messaging = require('../messaging');

function ObjectNotFoundError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, ObjectNotFoundError);

    this.status = status || 500;
    this.message = message || messaging.getMessage('OBJECT_NOT_FOUND_IN_DB')
};
util.inherits(ObjectNotFoundError, Error);
ObjectNotFoundError.prototype.name = 'ObjectNotFoundError';

module.exports = ObjectNotFoundError;