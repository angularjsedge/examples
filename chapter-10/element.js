angular.module('myApp').directive('someInputTagRelatedDirective', function () {
    return function (scope, elm, attrs) {
        // elm.get(0) does not work in jqLite
        console.log(e[0].getAttribute('type'));
        ; // this works
    };
});