// capitalizes the first letter of a string
blog.filter('capitalize', function () {
    return function (s) {
        if (!s || !angular.isString(s)) {
            return s;
        }
        return s.charAt(0).toUpperCase() + s.substring(1);
    };
});
