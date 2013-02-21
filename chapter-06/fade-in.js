// Our first directive. Will use jQuery to fade in or fade out a node based on an expression.
blog.directive('fadeIn', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attribs) {
            element.css('opacity', 0); // css available in jqLite
            scope.$watch(attribs.fadeIn, function (val) {
                if (val) {
                    $(element).animate({'opacity': 1.0}, 1000); // must use jQuery proper to use animate()
                } else {
                    $(element).animate({'opacity': 0}, 1000);
                }
            });
        }
    };
});