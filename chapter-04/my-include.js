myApp.directive('myInclude', function ($templateCache, $http, $q, $compile) {
    return {
        restrict: 'E',
        link: function (scope, elm, attrs) {
            // retrieves a template from the template cache over http as necessary.
            // returns a promise.
            (function () {
                var dfrd, template = $templateCache.get(scope.$eval(attrs.src));
                if (template) {
                    dfrd = $q.defer();
                    dfrd.resolve(template);
                    return dfrd.promise;
                } else {
                    return $http.get(scope.$eval(attrs.src), {}, {cache: $templateCache});
                }
            })().then(function (res) {
                    elm.replaceWith($compile(res.data)(scope));
                });
        }
    };
});
