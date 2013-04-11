(function () {
    'use strict';
    // Define our module. Yes, you need the empty array, or the module() function
    // becomes a "getter": angular.module('blog') would RETRIEVE the module instead of DECLARE it.
    var blog = angular.module('blog', []);
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
    // Define our first service; Posts
    // This service simply uses the built-in $http service to retrieve data from
    // a static JSON store.
    blog.service('Posts', function ($http) {
        this.getPosts = function () {
            return $http.get('data.json');
        };
    });

    // Our first directive.  Toggles boldface on node's contents when clicked.
    blog.directive('boldClick', function() {
        return function(scope, element) {
            var bold = false;
            element.bind('click', function() {
                if (bold) {
                    element.css('font-weight', 'normal');
                } else {
                    element.css('font-weight', 'bold');
                }
                bold = !bold;
            });
        };
    });
})();