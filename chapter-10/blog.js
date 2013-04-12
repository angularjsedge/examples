(function () {
    'use strict';
    // Define our module. Yes, you need the empty array, or the module() function
    // becomes a "getter": angular.module('blog') would RETRIEVE the module instead of DECLARE it.
    var blog = angular.module('blog', []);


    blog.config(function ($routeProvider) {
        // you will be very sad if you do not start your URLs with "/"; this could be a bug
        $routeProvider.when('/post/:id', {templateUrl: 'post'})
            .when('/posts', {templateUrl: 'posts'})
            .otherwise({redirectTo: '/posts'});
    });
    // Define our main controller.
    // Our first example of dependency injection; $scope and Posts are
    // automagically injected into the function by AngularJS.
    blog.controller('MainCtrl', function ($scope, Posts) {

        // Retrieve the posts from our "server". If this succeeds, we'll
        // put the posts into our $scope and do some post-processing.
        Posts.getPosts().success(function (data) {
            $scope.posts = data.posts;
            // Let's convert our timestamps to JS Date objects
            var i = $scope.posts.length;
            while (i--) {
                $scope.posts[i].date = new Date($scope.posts[i].date * 1000);
            }
        });
    });
    // Header controller presents a description for the blog
    blog.controller('HeadCtrl', function ($scope) {
        $scope.description = 'My Important Blog';
    });
// Controls the blog content including all methods related to posts
    blog.controller('ContentCtrl', function ($scope, Posts, Post, $routeParams) {

        // util function to stop editing all of the posts
        $scope._stopEditingAllPosts = function (posts) {
            var i;
            if (angular.isArray(posts)) {
                i = posts.length;
                while (i--) {
                    posts[i].stopEditing();
                }
            }
        };

        // Retrieve the posts from our "server". If this succeeds, we'll
        // put the posts into our $scope and do some post-processing.
        Posts.getPosts().success(function (data) {
            var posts = data.posts, i, post;
            $scope.posts = [];
            i = posts.length;
            // if an ID is specified, search for it and set it to $scope.post
            if ($routeParams.id) {
                while (i--) {
                    if (posts[i].id === $routeParams.id) {
                        $scope.post = posts[i];
                        break;
                    }
                }
            } else {
                // Create Post objects and put them into the list of posts.
                i = posts.length;
                while (i--) {
                    post = posts[i];
                    // convert to millisecond precision
                    $scope.posts.push(new Post(post.title, post.body, post.date * 1000,
                        post.author, true));
                }
            }
        });

        // This closes all editors if we happen to click the "new post" button
        $scope.$watch('posts', function (new_val, old_val) {
            if (new_val !== old_val) {
                $scope._stopEditingAllPosts(old_val);
            }
        });

        // Begins editing a post by making a temporary copy of the title and body,
        // and setting the "editing" flag for that post to be true.
        $scope.edit = function (post) {
            $scope._stopEditingAllPosts($scope.posts);
            post.beginEditing();
        };

        // Saves a post, sets its editing flag to false, puts it in the list of posts
        // and eliminates the 'new_post' from the scope.
        $scope.save = function (post) {
            post.save();
            $scope.posts.unshift(post);
            delete $scope.new_post;
        };

        // Cancels a post edit. Does not copy temp data, and sets the editing flag
        // to false. In addition we set the controller-wide "new_post" model to be
        // false, so the "New Post" button appears.
        $scope.cancel = function (post) {
            post.stopEditing();
            delete $scope.new_post;
        };

        // instantiate new Post object provided by Post factory
        $scope.newPost = function () {
            $scope._stopEditingAllPosts($scope.posts);
            $scope.new_post = new Post('Enter Title Here', 'Enter Body Here', undefined, 'me');
            $scope.new_post.beginEditing();
        };
    });

    // Define our first service; Posts
    // This service simply uses the built-in $http service to retrieve data from
    // a static JSON store.
    blog.service('Posts', function ($http) {
        this.getPosts = function () {
            return $http.get('data.json');
        };
    });

    // Our first directive.  Toggles boldface on node's contents when clicked.
    blog.directive('boldClick', function () {
        return function (scope, element) {
            var bold = false;
            element.bind('click', function () {
                if (bold) {
                    element.css('font-weight', 'normal');
                } else {
                    element.css('font-weight', 'bold');
                }
                bold = !bold;
            });
        };
    });


    // futureTime directive sets validity of text input box if the user types in a parsable time that is in the future
    blog.directive('futureTime', function () {
        return {
            require: '?ngModel',
            link: function (scope, elm, attrs, ngModel) {
                // no 'get()' in jqLite; use elm as array to get at the DOM node object
                if (!ngModel || attrs.type !== 'text' || elm[0].tagName.toLowerCase() !== 'input') {
                    return; // do nothing if no ngModel specified OR the input field is not of type "text"
                }
                // we want this to be the first check we do, in case there are others.
                // whatever we return from this function ends up as the view value, so if you want to clear invalid input,
                // simply return nothing.
                ngModel.$parsers.unshift(function (view_value) {
                    var ts, nows;
                    // first case: empty field. this is OK
                    if (!view_value) {
                        ngModel.$setValidity('futureTime', true);
                        return;
                    }
                    // second case: unparsable date
                    ts = Date.parse(view_value);
                    if (isNaN(ts) || ts < 0) {
                        ngModel.$setValidity('futureTime', false);
                        return view_value;
                    }
                    // third case: valid date, but in the past or present
                    nows = new Date().getTime();
                    if (ts <= nows) {
                        ngModel.$setValidity('futureTime', false);
                        return view_value;
                    }
                    // fourth case: future date!
                    ngModel.$setValidity('futureTime', true);
                    return view_value;
                });
            }
        };


    });

    // returns a class Post which represents a blog post
    blog.factory('Post', function () {
        // set date, author, and temporary title and body
        // date can be a Date object or a JS timestamp or anything else Date objects accept
        var Post = function (title, body, date, author, autosave) {
            this.date = new Date(date);
            this.author = author;
            if (autosave) {
                this.title = title;
                this.body = body;
                this.temp = {};
            } else {
                this.temp = {title: title, body: body};
            }
        };
        // update the date to NOW
        Post.prototype.updateDate = function () {
            this.date = new Date(); // js Date object
        };
        // save the temp info to the real info, then update the date to now.
        Post.prototype.save = function () {
            this.title = this.temp.title;
            this.body = this.temp.body;
            this.updateDate();
            this.stopEditing();
        };
        // prepares this post for editing
        Post.prototype.beginEditing = function () {
            this.editing = true;
            this.temp.title = this.title;
            this.temp.body = this.body;
        };
        // takes the post out of 'editing' mode
        Post.prototype.stopEditing = function () {
            this.editing = false;
            this.temp = {};
        };
        // handiness to convert this Post to a string, for debugging purposes
        Post.prototype.toString = function () {
            return angular.toJson(this);
        };
        return Post;
    });
    // Modal factory gives you a Modal dialog. Bootstrap required!
    blog.factory('Modal', function ($q, $templateCache, $http, $compile) {
        // sets some properties and initializes a deferred to play with.
        // scope: Scope object to apply to template
        // template_id: ID or path of AngularJS template or partial
        // options: object full of options to give to Bootstrap's modal() upon open
        var Modal = function (scope, template_id, options) {
            options = options || {};
            this.scope = scope;
            this.template_id = template_id;
            this.options = {};
            angular.extend(this.options, {show: false}, options);
            this.dfrd = $q.defer();
        };
        // shows a modal dialog; returns a promise to be resolved
        // when the dialog is opened.
        // does not check if one is already opened.
        Modal.prototype.open = function () {
            var template, that = this;
            if (this.modal) {
                this.dfrd = $q.defer();
                this.modal.modal('show');
                this.dfrd.resolve();
                return this.dfrd.promise;
            }
            template = $templateCache.get(this.template_id);
            // cache miss
            if (angular.isUndefined(template)) {
                $http.get(this.template_id).success(function (data) {
                    template = data;
                    that.modal = $compile(template)(that.scope).modal(that.options);
                    that.modal.modal('show');
                    that.dfrd.resolve();
                }).error(function () {
                        throw new Error('unable to find template "' + that.template_id + '" anywhere. maybe template gnomes stole it?');
                    });
            } else {
                this.modal = $compile(template)(this.scope).modal(this.options);
                this.modal.modal('show');
                this.dfrd.resolve();
            }
            return that.dfrd.promise;
        };
        // closes a modal dialog. if no dialog exists, tosses an exception.
        // does not check to see if the modal is currently open.
        Modal.prototype.close = function () {
            if (!this.modal) {
                throw new Error('unable to close an unopened modal');
            }
            this.modal.modal('hide');
        };
        return Modal;
    });

})();