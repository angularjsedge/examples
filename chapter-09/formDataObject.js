myApp.factory('formDataObject', function () {
    return function (data) {
        var fd = new FormData(), key;
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                fd.append(key, data[key]);
            }
        }
        return fd;
    };
});

// note not using "post" method here; this one seems to be a bit more relaxed on the headers
// but it may work for you
$http({
    method: 'POST',
    url: '/maybe/accepts/a/file',
    data: flat_object,
    // XXX: this seems to be a bug in AngularJS
    headers: {
        'Content-type': '',
        'Content-Type': ''
    },
    transformRequest: formDataObject
}).success(function (data) {
        // process response
    });