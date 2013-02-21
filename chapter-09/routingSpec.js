describe('ContentCtrl', function () {
    it('should put a single post in the scope if an ID appears in $routeParams', function () {
        inject(function (Posts, Post, $httpBackend, $http) {
            $http.defaults.transformRequest = []; // remove any fancy request transforms
            // mock $routeParams; assume they got set by $route service
            var $routeParams = {
                    id: 1
                },
                posts = [
                    {id: 1, title: 'foo'},
                    {id: 2, title: 'bar'}
                ];
            $httpBackend.expectGET('data.json').respond({posts: posts});
            $controller('ContentCtrl', {$scope: scope, Posts: Posts,
                Post: Post, $routeParams: $routeParams});
            $httpBackend.flush();
            expect(scope.post).toBe(posts[0]);
            expect(scope.posts).toEqual([]);
        });
    });
    it('should put a list of posts in the scope if no ID appears in $routeParams', function () {
        inject(function (Posts, Post, $httpBackend, $http) {
            $http.defaults.transformRequest = []; // remove any fancy request transforms
            // mock $routeParams; assume they got set by $route service
            var $routeParams = {},
                posts = [
                    {id: 1, title: 'foo'},
                    {id: 2, title: 'bar'}
                ];
            $httpBackend.expectGET('data.json').respond({posts: posts});
            $controller('ContentCtrl', {$scope: scope, Posts: Posts,
                Post: Post, $routeParams: $routeParams});
            $httpBackend.flush();
            expect(scope.post).not.toBeDefined();
            expect(scope.posts[0].title).toBe('bar');
            expect(scope.posts[1].title).toBe('foo');
        });
    });
});