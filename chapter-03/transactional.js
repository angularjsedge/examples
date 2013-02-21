angular.module('app', []).directive('transactional', function ($parse) {
    return {
        restrict: 'E',
        scope: true,
        link: function (scope, elm, attrs) {
            // get a "getter" fn from the $parse service
            var model = $parse(attrs.model);
            // use the "setter" fn to put a copy of what's specified in the "model" attribute
            // into this directive's scope, which does NOT inherit from the parent.
            model.assign(scope, angular.copy(model(scope)));
// upon save, reassign the parent's model to the current value of this directive's
            // model.
            scope.$save = function () {
                model.assign(scope.$parent, model(scope));
            };
        }
    };
});
// ...and some unit tests
beforeEach(module('app'));
describe('transactional directive', function () {
    var scope;
    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new(); // make brand new child scope off of root
    }));
    describe('the model', function () {
        it('should propagate to the parent only when $saved', inject(function ($compile) {
            var template, compiled, isolateScope;
            scope.foo = 'bar';
            template = '<transactional model="foo"></transactional>';
            compiled = $compile(template)(scope);
            isolateScope = compiled.scope();
            isolateScope.$apply('foo = "baz"');
            expect(scope.foo).toBe('bar');
            isolateScope.$apply('$save()');
            expect(scope.foo).toBe('baz');
        }));
    });
});
