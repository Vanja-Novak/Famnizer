module.exports = function(err, req, res, next) {
    if(err) {
        res.status(err.status);
        res.json(err);
    }
}
