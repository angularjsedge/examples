blog.config(function ($httpProvider, $routeProvider) {
    // .. a bunch of $httpProvider configuration
// you will be very sad if you do not start your URLs with "/"; this could be a bug
    $routeProvider.when('/post/:id', {templateUrl: 'post'})
        .when('/posts', {templateUrl: 'posts'})
        .otherwise({redirectTo: '/posts'});
});
