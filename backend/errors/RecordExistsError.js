var util = require('util');
var messaging = require('../messaging');

function RecordExistsError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, RecordExistsError);

    this.status = status || 500;
    this.message = message || messaging.getMessage('OBJECT_ALREADY_EXISTS_IN_DB');
};
util.inherits(RecordExistsError, Error);
RecordExistsError.prototype.name = 'RecordExistsError';

module.exports = RecordExistsError;