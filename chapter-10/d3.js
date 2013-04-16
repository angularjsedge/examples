var myApp = angular.module('myApp', []);
// provides some data and a randomize function
myApp.controller('MyCtrl', function($scope) {
    $scope.data = [1, 2, 4, 8, 16, 32];
// randomizes the order of the $scope.data array.
    $scope.randomize = function () {
        var i = $scope.data.length,
            tempi, tempj;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            tempi = $scope.data[i];
            tempj = $scope.data[j];
            $scope.data[i] = tempj;
            $scope.data[j] = tempi;
        }
    };
});

// puts a D3 div-based bar chart on a tag, and updates it
// as the model changes.
myApp.directive('barChart', function () {
    return function (scope, elm, attrs) {
        var data = scope.$eval(attrs.barChart);
// handy-dandy width function
        function width(d) {
            return d * 10 + 'px';
        }

// grab our element and put some divs in it of varying sizes
        // depending on the data. yes, there are probably sexier ways to do this.
        d3.select(elm[0])
            .selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .style('width', width)
            .text(angular.identity);
// watch the data and update the divs within the element with their
        // new widths.
        scope.$watch(attrs.barChart, function (new_val, old_val) {
            if (new_val !== old_val) {
                d3.select(elm[0])
                    .selectAll('div')
                    .data(new_val)
                    .style('width', width);
            }
        }, true);
    }
});
