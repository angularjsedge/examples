describe('Blog Services', function () {
    var Posts, httpBackend;
    beforeEach(inject(function ($injector, $httpBackend) {
        Posts = $injector.get('Posts');
        httpBackend = $httpBackend;
    }));
    describe('Posts', function () {
        it('should initiate the http call', function () {
            var promise;
            httpBackend.expectGET('data.json').respond('foo');
            promise = Posts.getPosts();
            expect(angular.isFunction(promise.then)).toBeTruthy();
            promise.success(function (data) {
                expect(data).toBe('foo');
            });
            promise.then(function (res) {
                expect(res.data).toBe('foo');
                expect(res.status).toBe(200);
                expect(res.config).toEqual({
                    method: 'GET',
                    url: 'data.json'
                });
                expect(angular.isFunction(res.headers)).toBeTruthy();
            });
            httpBackend.flush();
        });

        it('should call Posts.getPosts() and execute a function upon resolving', function () {
            inject(function (Posts, Post, $q) {
                var dfrd = $q.defer(),
                    success_spy = jasmine.createSpy('success').andReturn([]);
                angular.extend(dfrd.promise, {
                    success: success_spy
                });
                spyOn(Posts, 'getPosts').andReturn(dfrd.promise);
                $controller('ContentCtrl', {$scope: scope, Posts: Posts,
                    Post: Post, $routeParams: {}});
                expect(Posts.getPosts).toHaveBeenCalled();
                expect(dfrd.promise.success).toHaveBeenCalled();
            });
        });
    });
});

