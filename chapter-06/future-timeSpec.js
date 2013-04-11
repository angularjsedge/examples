describe('Blog Directives', function () {
    var $compile, scope;
    // this is a convenient function to use when unit testing directives;
    // you will find yourself doing this often
    function compileAndApply(template) {
        var compiled = $compile(template)(scope);
        scope.$apply();
        return compiled;
    }

    beforeEach(module('blog'));
    beforeEach(inject(function ($injector, $rootScope) {
        $compile = $injector.get('$compile');
        scope = $rootScope.$new();
    }));
    describe('the linking function', function () {
        it('should not throw error if no ngModel supplied', function () {
            var template = '<form name="timeForm">' +
                '<input name="time" type="text" future-time/>' +
                '</form>';
            expect(function () {
                compileAndApply(template);
            }).not.toThrow();
        });
        it('should be valid on undefined value', function () {
            var template = '<form name="timeForm">' +
                '<input ng-model="time" name="time" type="text" future-time/>' +
                '</form>';
            compileAndApply(template);
            expect(scope.time).toBeUndefined();
            expect(scope.timeForm.$valid).toBeTruthy();
        });
        it('should be invalid on non-parseable date', function () {
            var template = '<form name="timeForm">' +
                    '<input ng-model="time" name="time" type="text" future-time/>' +
                    '</form>',
                compiled = compileAndApply(template);
            // this appears to be how you fake an input change.
            compiled.find('input').val('not a date');
            compiled.find('input').triggerHandler('input');
            expect(scope.timeForm.$valid).toBeFalsy();
        });
        it('should be invalid on past date', function () {
            var template = '<form name="timeForm">' +
                    '<input ng-model="time" name="time" type="text" future-time/>' +
                    '</form>',
                compiled = compileAndApply(template);
            compiled.find('input').val('1998-01-01');
            compiled.find('input').triggerHandler('input');
            expect(scope.timeForm.$valid).toBeFalsy();
        });
        it('should be valid on future date', function () {
            var template = '<form name="timeForm">' +
                    '<input ng-model="time" name="time" type="text" future-time/>' +
                    '</form>',
                compiled = compileAndApply(template);
            compiled.find('input').val('2050-01-01');
            compiled.find('input').triggerHandler('input');
            expect(scope.timeForm.$valid).toBeTruthy();
        });
    });
});

