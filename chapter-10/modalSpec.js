describe('The Modal Class', function () {
    var scope, Modal;
    beforeEach(inject(function ($rootScope, $injector) {
        scope = $rootScope.$new();
        // if you want to call something Modal in your local scope,
        // and the service name happens to *be* Modal, you can
        // just ask the injector service for it.
        Modal = $injector.get('Modal');
    }));
    describe('the constructor', function () {
        it('should extend the options', function () {
            var modal = new Modal(scope, 'foo', {foo: 'bar'});
            expect(modal.options).toEqual({show: false, foo: 'bar'});
        });
        it('should create a deferred', function () {
            var modal = new Modal(scope, 'foo', {foo: 'bar'});
            expect(angular.isObject(modal.dfrd.promise)).toBeTruthy();
        });
    });
    describe('the open method', function () {
        it('should throw an error if supplied a bad template id', inject(function ($httpBackend, $http, $window) {
            spyOn($window, 'alert');
            var modal = new Modal(scope, 'foo');
            $httpBackend.expectGET('foo').respond(404);
            expect(modal.open).toThrow();
            // apparently you don't need to flush if you respond with an error
        }));
        it('should get a cached template', inject(function ($templateCache) {
            $templateCache.put('foo', '<div>foo!</div>');
            var modal = new Modal(scope, 'foo');
            // wasn't sure how to get a spy to return its "this"
            angular.element.prototype.modal = function () {
                this.called = true;
                return this;
            };
            modal.open();
            expect(modal.modal.called).toBeTruthy();
        }));
        it('should resolve its promise', inject(function ($templateCache) {
            var resolved = false, modal;
            $templateCache.put('foo', '<div>foo!</div>');
            modal = new Modal(scope, 'foo');
            angular.element.prototype.modal = function () {
                return this;
            };
            scope.$apply(function () {
                var promise = modal.open();
                promise.then(function () {
                    resolved = true;
                });
            });
            expect(resolved).toBeTruthy();
        }));
        it('should open again if modal exists', inject(function ($templateCache) {
            var modal, resolved = false;
            $templateCache.put('foo', '<div>foo!</div>');
            modal = new Modal(scope, 'foo');
            angular.element.prototype.modal = function () {
                return this;
            };
            scope.$apply(function () {
                modal.open();
            });
            scope.$apply(function () {
                modal.open().then(function () {
                    resolved = true;
                });
            });
            expect(resolved).toBeTruthy();
        }));
    });
    describe('the close method', function () {
        it('should throw an error if it cannot find a modal', function () {
            var modal = new Modal();
            expect(modal.close).toThrow();
        });
        it('should attempt to close the modal', inject(function ($templateCache) {
            var modal, resolved = false, command = '';
            $templateCache.put('foo', '<div>foo!</div>');
            modal = new Modal(scope, 'foo');
            angular.element.prototype.modal = function () {
                command = arguments[0];
                return this;
            };
            scope.$apply(function () {
                modal.open().then(function () {
                    modal.close();
                    resolved = true;
                });
            });
            expect(command).toBe('hide');
            expect(resolved).toBeTruthy();
        }));
    });
});
