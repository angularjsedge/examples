blog.directive('copyright', function () {
    return {
        restrict: 'M',
        compile: function (element) {
            element.text('Copyright 2013 Rhoda Bote');
        }
    };
});