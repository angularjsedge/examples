var myApp = angular.module('myApp', []);
myApp.controller('MyCtrl', function ($scope) {
    $scope.addTwo = function (n) {
        return n + 2;
    };
});
myApp.service('MyService', function () {
    this.addThree = function (n) {
        return n + 3;
    };
});
myApp.directive('myDirective', function () {
    return {
        link: function (scope, elm, attrs) {
            scope.$watch(attrs.myDirective, function (value) {
                elm.text(value + 4);
            });
        }
    }
});
myApp.filter('myfilter', function () {
    return function (s) {
        return s + 5;
    };
});

var injector = angular.injector(['ng', 'myApp']);
var init = {
    setup: function () {
        this.$scope = injector.get('$rootScope').$new();
    }
};
module('tests', init);
test('MyCtrl', function () {
    var $controller = injector.get('$controller');
    $controller('MyCtrl', {
        $scope: this.$scope
    });
    equal(3, this.$scope.addTwo(1));
});
test('MyService', function () {
    var MyService = injector.get('MyService');
    equal(4, MyService.addThree(1));
});
test('MyDirective', function () {
    var $compile = injector.get('$compile');
    var element = $compile('<div my-directive="foo"></div>')(this.$scope);
    this.$scope.foo = 1;
    this.$scope.$apply();
    equal(5, element.text());
    delete this.$scope.foo;
});
test('MyFilter', function () {
    var $filter = injector.get('$filter');
    equal(6, $filter('myfilter')(1));
});

