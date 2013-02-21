blog.provider('$exceptionHandler', function () {
    this.$get = function () {
        return function (e) {
            throw e;
        };
    };
});