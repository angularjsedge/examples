function SomeCtrl($scope, $log) {
    $scope.foo = 'bar';

    $scope.$watch('foo', function (new_val, old_val) {
        if (new_val !== old_val) {
            $log.log("foo used to be '" + old_val + "', but is now '" + new_val + "'");
        }
    });
}
describe('SomeCtrl', function () {
    var scope;
    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new(); // make brand new child scope off of root
    }));
    describe('the watch on foo', function () {
        it('should fire when foo changes', function () {
            inject(function ($controller, $log) {
                spyOn($log, 'log');
                scope.$apply(function () {
                    $controller(SomeCtrl, {
                        $scope: scope,
                        $log: $log
                    });
                });
                expect(scope.foo).toBe('bar');
                scope.$apply("foo = 'baz'");
                expect(scope.foo).toBe('baz');
                expect($log.log).toHaveBeenCalled();
            });
        });
    });
});

describe('watches', function () {
    var scope;
    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        scope.$apply('foo = {bar: "baz"}');
    }));
    it('when watching by reference, should not fire when object member updated', inject(function ($log) {
        spyOn($log, 'log');
        scope.$apply(function () {
            scope.$watch('foo', function (new_val, old_val) {
                if (new_val !== old_val) {
                    $log.log("foo used to be '" + angular.toJson(old_val) + "', but is now '" + angular.toJson(new_val) + "'");
                }
            });
        });
        scope.$apply('foo.bar = "spam"');
        expect($log.log).not.toHaveBeenCalled();
    }));
    it('when watching by value, should fire when object member updated', inject(function ($log) {
        spyOn($log, 'log');
        scope.$apply(function () {
            scope.$watch('foo', function (new_val, old_val) {
                if (new_val !== old_val) {
                    $log.log("foo used to be '" + angular.toJson(old_val) + "', but is now '" + angular.toJson(new_val) + "'");
                }
            }, true);
        });
        scope.$apply('foo.bar = "spam"');
        expect($log.log).toHaveBeenCalled();
    }));
});