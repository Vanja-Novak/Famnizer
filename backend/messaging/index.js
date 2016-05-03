var phrases = require('./ru');

module.exports.getMessage = function(name) {
    if (!phrases[name]) {
        throw new Error("Нет такой фразы: " + name);
    }
    return phrases[name];
};

