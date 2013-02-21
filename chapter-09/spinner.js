// configure $http to always pass this header
// also, display a spinner during any Ajax request
blog.config(function ($httpProvider) {
    var spinner; // jqLite obj representing spinner
    $httpProvider.defaults.headers.common['X-Blog-Version'] = '1.0';
    // first thing we do when sending a request: pop a spinner
    $httpProvider.defaults.transformRequest.unshift(function (req) {
        spinner = angular.element('<h1>Working...</h1>');
        $('body').append(spinner);
        return req; // return request unspoiled
    });
    // last thing we do when retrieving a response (before success() and the like):
    // hide the spinner.
    $httpProvider.defaults.transformResponse.push(function (res) {
        if (spinner) {
            spinner.remove();
        }
        return res; // return response unspoiled
    });
});

// OR ...


blog.config(function ($httpProvider, $routeProvider, $provide) {

    // pop a spinner when any HTTP req is made and remove it when the response comes in
    $provide.decorator('$httpBackend', function ($delegate) {
        // do not blast mock $httpBackend if it exists
        if (angular.isDefined(angular.mock)) {
            return $delegate;
        }
        return function (method, url, reqData, done, reqHeaders, timeout, withCredentials) {
            var spinner = angular.element('<h1>Working...</h1>');
            $('body').append(spinner);
            $delegate(method, url, reqData, function () {
                spinner.remove();
                done.apply(this, arguments);
            }, reqHeaders, timeout, withCredentials);
        };
    });
});


