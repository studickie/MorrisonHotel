exports.logErrors = function(err, req, res, next) {
    console.log('Log Error -> ', err.stack);
    return next(err);
}