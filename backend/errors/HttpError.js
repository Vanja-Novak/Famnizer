var util = require('util');

function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status || 404;
    this.message = message || 'Что-то пошло не так :)';
};
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

exports.ObjectNotFoundError = HttpError;