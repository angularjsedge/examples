describe('ContentCtrl', function () {
    describe('basic methods', function () {
// all this stuff happens whenever we instantiate the controller
        beforeEach(inject(function (Posts, Post, $routeParams, $httpBackend, $http) {
            $http.defaults.transformRequest = []; // remove any fancy request transforms
            $httpBackend.expectGET('data.json').respond({posts: []});
            $controller('ContentCtrl', {$scope: scope, Posts: Posts,
                Post: Post, $routeParams: $routeParams});
            $httpBackend.flush();
        }));
        describe('_stopEditingAllPosts', function () {
            it('should call stopEditing() on all members of posts array',
                inject(function (Post) {
                    var posts = [
                        new Post(),
                        new Post(),
                        new Post()
                    ];
                    spyOn(Post.prototype, 'stopEditing');
                    scope._stopEditingAllPosts(posts);
                    expect(Post.prototype.stopEditing).toHaveBeenCalled();
                    expect(Post.prototype.stopEditing.calls.length).toBe(3);
                }));
        });
        describe('edit', function () {
            it('should call _stopEditingAllPosts', inject(function (Post) {
                var post = new Post();
                spyOn(scope, '_stopEditingAllPosts');
                scope.edit(post);
                expect(scope._stopEditingAllPosts).toHaveBeenCalled();
            }));
            it('should call Post.prototype.beginEditing', inject(function (Post) {
                var post = new Post();
                spyOn(Post.prototype, 'beginEditing');
                scope.edit(post);
                expect(Post.prototype.beginEditing).toHaveBeenCalled();
            }));
        });
        describe('save', function () {
            it('should call save on the post', inject(function (Post) {
                var post = new Post();
                spyOn(Post.prototype, 'save');
                scope.save(post);
                expect(Post.prototype.save).toHaveBeenCalled();
            }));
            it('should prepend to list of posts', inject(function (Post) {
                var post = new Post();
                scope.$apply(function () {
                    scope.save(post);
                });
                expect(scope.posts.length).toBe(1);
                expect(scope.posts[0]).toBe(post);
            }));
            it('should delete new_post', inject(function (Post) {
                var post = new Post();
                spyOn(Post.prototype, 'save');
                scope.$apply('new_post = "foo"');
                scope.$apply(function () {
                    scope.save(post);
                });
                expect(scope.new_post).toBeUndefined();
            }));
        });
        describe('cancel', function () {
            it('should call Post.prototype.stopEditing', inject(function (Post) {
                var post = new Post();
                spyOn(Post.prototype, 'stopEditing');
                scope.$apply(function () {
                    scope.cancel(post);
                });
                expect(Post.prototype.stopEditing).toHaveBeenCalled();
            }));
            it('should delete new_post', inject(function (Post) {
                var post = new Post();
                spyOn(Post.prototype, 'save');
                scope.$apply('new_post = "foo"');
                scope.$apply(function () {
                    scope.cancel(post);
                });
                expect(scope.new_post).toBeUndefined();
            }));
        });
        describe('newPost', function () {
            it('should call _stopEditingAllPosts', function () {
                spyOn(scope, '_stopEditingAllPosts');
                scope.newPost();
                expect(scope._stopEditingAllPosts).toHaveBeenCalled();
            });
            it('should create a new post', inject(function (Post) {
                spyOn(Post.prototype, 'beginEditing'); // blasts our data
                scope.$apply(function () {
                    scope.newPost();
                });
                expect(scope.new_post.temp.title).toBe('Enter Title Here');
                expect(scope.new_post.temp.body).toBe('Enter Body Here');
                expect(scope.new_post.author).toBe('me');
            }));
            it('should call Post.prototype.beginEditing', inject(function (Post) {
                spyOn(Post.prototype, 'beginEditing'); // blasts our data
                scope.$apply(function () {
                    scope.newPost();
                });
                expect(Post.prototype.beginEditing).toHaveBeenCalled();
            }));
        });
    });
});
