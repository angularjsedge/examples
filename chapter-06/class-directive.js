// This directive is like the "!important" CSS value on steroids.
// it will automatically use JavaScript to override whatever CSS a node may have on it.
// I think this is probably a terrible idea.
blog.directive('importantBackgroundColor', function () {
    return {
        restrict: 'C',
        priority: -99999, // we want this to be run dead last
// we don't use compile because we want to do this at the last possible minute
        link: function (scope, element, attribs) {
            element.css('background-color', attribs.color);
        }
    };
});