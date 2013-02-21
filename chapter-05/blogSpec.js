/*global beforeEach, describe, afterEach, module, expect, it, inject*/
(function () {
    'use strict';
// grab the blog module before each test
    beforeEach(module('blog'));
    describe('Blog Controllers', function () {
        var scope, // controllers need scopes, so here's ours
            $controller; // $controller service to instantiate controllers
        beforeEach(inject(function ($injector, $rootScope) {
            scope = $rootScope.$new(); // make brand new child scope off of root
            $controller = $injector.get('$controller');
        }));
        afterEach(function () {
            scope.$destroy(); // eliminate our scope after each test run
        });
        describe('HeadCtrl', function () {
// all that HeadCtrl does is set a description. That's pretty easy to test.
            it('should set the description', function () {
                $controller('HeadCtrl', {$scope: scope});
                expect(scope.description).toBe('My Important Blog');
            });
        });
    });
})();
