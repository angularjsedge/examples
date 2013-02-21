// This directive replaces <new-post-area> with the template below
// it links the post, cancel and save attribs to the parent scope,
// but it copies cancelText and saveText verbatim.
blog.directive('newPostArea', function () {
    return {
        restrict: 'E',
        scope: {
            post: '=',
            cancel: '=',
            save: '=',
            cancelText: '@',
            saveText: '@'
        },
        replace: true,
        template: '<div ng-show="post">' +
            '<input type="text" ng-model="post.temp.title"/><br/>' +
            '<textarea ng-model="post.temp.body"></textarea><br/>' +
            '<button ng-click="cancel(post)">{{cancelText}}</button>' +
            '<button ng-click="save(post)">{{saveText}}</button></div>'
    };
});