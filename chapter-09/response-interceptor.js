// error messaging upon non-OK response from server
$httpProvider.responseInterceptors.push(function ($q, $window) {
    return function (promise) {
        return promise.then(angular.identity, function (res) {
            $window.alert('Egad, there was an error!');
            return $q.reject(res);
        });
    };
});


// error messaging upon non-OK response from server
// or special $error response
$httpProvider.responseInterceptors.push(function ($q, $window) {
    return function (promise) {
        return promise.then(function (res) {
            if (res.data.$error) {
                $window.alert('Yikes, the server had a problem!');
                return $q.reject(res);
            }
            return res;
        }, function (res) {
            $window.alert('Egad, there was an error!');
            return $q.reject(res);
        });
    };
});