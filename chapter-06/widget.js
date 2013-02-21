blog.directive('accordion', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="accordion"><h3>{{title}}</h3>' +
            '<div class="accordion-content" ng-show="open" ng-transclude></div>',
        transclude: true,
        scope: {
            title: '='
        },
        link: function (scope, elm) {
            scope.open = false;
// assume we have no jQuery.
            angular.element(elm.children()[0]).bind('click', function () {
                scope.$apply('open = !open');
            });
        }
    };
});
