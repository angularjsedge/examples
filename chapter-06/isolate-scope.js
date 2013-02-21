// Debug directive helps you debug a little more nicely than normal.
// Usage:
// <debug val="foo"/>
// Output HTML:
// <debug val="foo"><pre>{{debug(expression)}}</pre></debug>
// .. where debug(expression) results in a pretty-printed JSON representation of the expression
// defined in @val.
blog.directive('debug', function () {
    return {
        restrict: 'E',
        scope: {
            expression: '=val'
        },
        template: '<pre>{{debug(expression)}}</pre>',
        link: function (scope) {
            // pretty-prints
            scope.debug = function (exp) {
                return angular.toJson(exp, true);
            };
        }
    };
});