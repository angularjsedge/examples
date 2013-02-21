$http({
    method: 'GET',
    url: '/pigs/and/chickens/',
    data: {
        cows: 'horses'
    },
    params: {
        sheepdogs: 'mules'
    },
    headers: {
        'X-Farm-Animals': 1.0
    }
}).success(function (data) {
        // do stuff with response data; AngularJS will try to give you a JS object if it detects JSON
    }).error(function (data) {
        // handle non-200 response codes
    });


$http.get('/pigs/and/chickens', {cows: 'horses'}, {
    params: {
        sheepdogs: 'mules'
    },
    headers: {
        'X-Farm-Animals': 1.0
    }
}).success(function (data) {
        // do stuff with response data; AngularJS will try to give you a JS object if it detects JSON
    }).error(function (data) {
        // handle non-200 response codes
    });
