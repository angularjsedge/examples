// controls formattedDebug and looseDebug directives.
blog.controller('DebugCtrl', function ($scope, $element) {
    var minimized = false;
// pretty prints a debug
    this.debug = function (exp) {
        return angular.toJson(exp, true);
    };
// toggles hidden/shown
    this.toggle = function () {
        if (minimized) {
            $element.find('div>div').show({duration: 1000});
        } else {
            $element.find('div>div').hide({duration: 1000});
        }
        minimized = !minimized;
    };
});

// sets an area in which preformattedDebug and looseDebug may talk to each other
blog.directive('debugZone', function () {
    return {
        restrict: 'E',
        controller: 'DebugCtrl'
    };
});

// displays a debug in a <pre>
blog.directive('preformattedDebug', function () {
    return {
        restrict: 'E',
        scope: {expression: '=val'},
        template: '<div><button ng-click="toggle()">toggle debugs</button> <div><pre>{{debug(expression)}}</pre></div></div>',
        require: '^debugZone',
        link: function (scope, elm, attrs, debug) {
            scope.debug = debug.debug;
            scope.toggle = debug.toggle;
        }
    };
});
// displays a debug in a <div>
blog.directive('looseDebug', function () {
    return {
        restrict: 'E',
        scope: {expression: '=val'},
        template: '<div><button ng-click="toggle()">toggle debugs</button> <div>{{debug(expression)}}</div></div>',
        require: '^debugZone',
        link: function (scope, elm, attrs, debug) {
            scope.debug = debug.debug;
            scope.toggle = debug.toggle;
        }
    };
});
