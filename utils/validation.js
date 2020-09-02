

exports.patternTypes = {
    //~ ----------------------------------------------------------
    //~     Good explanation of lookahead in RegEx
    //~     https://www.rexegg.com/regex-lookarounds.html#password
    //~ ----------------------------------------------------------
    email: new RegExp(/^[A-Za-z]([\w\.\:\-]+)?@\w+\.\w+$/),
    password: new RegExp(/(?=(^\w{8,16})$)(?=([^a-z]*[a-z]))(?=(?:[^A_Z]*[A-Z]))(?=(\D*\d){3,})[^\s]/)
};

exports.validatePattern = function (string, patternType) {
    //~ string; value being checked
    //~ patternType; *use property of patternType object, pattern to check against

    return patternType.test(string);
}