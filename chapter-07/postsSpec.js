describe('Blog Services', function () {
    var Posts, httpBackend;
// I want to use the variable name Posts for my service, but if I use DI here to inject it
// the variable name will already be taken! A fun way around this limitation is to inject the $injector service,
// then simply ask it for what you want.
    beforeEach(inject(function ($injector, $httpBackend) {
        Posts = $injector.get('Posts');
        httpBackend = $httpBackend;
    }));
    describe('Posts', function () {
        it('should initiate the http call', function () {
            var promise;
// you will need to use expectGET, expectPOST, etc., when unit testing functions
// that use the $http service. They are assertions about what call you are making and allow
// you to mock a response easily.
            httpBackend.expectGET('data.json').respond('foo');
            promise = Posts.getPosts();
// make sure our promise is really a then-able object
            expect(angular.isFunction(promise.then)).toBeTruthy();
            promise.then(function (res) {
                expect(res.data).toBe('foo');
            });
            httpBackend.flush();
        });
    });
});
