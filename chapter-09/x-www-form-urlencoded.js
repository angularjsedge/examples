$http.get('/some/fussy/service', 'json=' + encodeURIComponent(angular.toJson(some_object)) +
        '\n' + 'foo=' + encodeURIComponent('bar')).
    success(function (data) {
        // process data
    });

