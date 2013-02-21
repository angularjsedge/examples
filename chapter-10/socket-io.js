angular.module('app').factory('connect', function ($window, $q) {
    return function (scope, url) {
        var socket = $window.io.socket(url);
        return {
            // wrapper around socket.on()
            on: function (event) {
                var dfrd = $q.defer();
                socket.on(event, function () {
                    var args = arguments;
                    scope.$apply(function () {
                        dfrd.resolve.apply(dfrd, args);
                    });
                });
                return dfrd.promise;
            },
            // wrapper around socket.emit()
            emit: function (event, data) {
                var dfrd = $q.defer();
                socket.on(event, data, function () {
                    var args = arguments;
                    scope.$apply(function () {
                        dfrd.resolve.apply(dfrd, args);
                    });
                });
                return dfrd.promise;
            }
        };
    };
})();
//
//And basic usage:
//
//Socket.IO Factory Usage

function MyCtrl($scope, connect) {
    // remember; socket is not a real Socket.IO socket object; it's our wrapper
    var socket = connect($scope, 'http://localhost.com');
    socket.on('some_event').then(function () {
        // do stuff
    });
    socket.emit('some_other_event', {foo: 'bar'}).then(function () {
        // do other stuff
    });
}
