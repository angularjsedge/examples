// Controls the blog content including all methods related to posts
blog.controller('ContentCtrl', function ($scope, Posts, Post) {
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
        // Create Post objects and put them into the list of posts.
        i = posts.length;
        while (i--) {
            post = posts[i];
            // convert to millisecond precision
            $scope.posts.push(new Post(post.title, post.body, post.date * 1000,
                post.author, true));
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
    // and elimates the 'new_post' from the scope.
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

