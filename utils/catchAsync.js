//~ --------------------------------------------------------------
//~     Async error wrapper follows example from
//~     -> thecodebarbarian.com/80-20-guide-to-express-error-handling
//~     -> zellwk.com/blog/async-await-express
//~ --------------------------------------------------------------

function catchAsync (fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(next);
    }
}

module.exports = catchAsync;