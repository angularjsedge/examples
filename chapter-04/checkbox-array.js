myApp.directive('checkboxArray', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModel) {
            var value = scope.$eval(attrs.checkboxArray),
            // the thing we will put in our array specified by ngModel
                array = $parse(attrs.ngModel); // getter/setter for ngModel
            // if we have not defined the ngModel, let's assign an empty array to it
            // otherwise we may run into problems getting the length of an undefined object
            if (angular.isUndefined(array(scope))) {
                array.assign(scope, []);
            }
            // when the checkbox is clicked, execute this
            elm.bind('change', function () {
                var arrayValues = array(scope),
                // get the actual array out of the scope
                    i = arrayValues.length;
                if (elm.attr('checked')) {
                    // if we wound up checked, push the thing onto the array specified by ngModel
                    arrayValues.push(value);
                    // need to apply since this is a jQuery event
                    scope.$apply(function () {
                        ngModel.$setViewValue(true); // checkbox will want to be true/false
                        array.assign(scope, arrayValues); // update the scope
                    });
                } else {
                    // find the object in our array and remove it
                    while (i--) {
                        if (arrayValues[i] === value) {
                            arrayValues.splice(i, 1);
                            scope.$apply(function () {
                                ngModel.$setViewValue(false);
                                array.assign(scope, arrayValues);
                            });
                            return;
                        }
                    }
                }
            });
            // this little gem will watch the array specified in ngModel *by value*
            // and update when necessary. this way you can add/remove
            // and reorder the array you specified willy-nilly, and the checkboxes will be updated.
            // otherwise, if we specified ngModel.$render, it would only be called when the reference updates--
            // reassigning our array to something else.
            scope.$watch(attrs.ngModel, function (arrayValues, oldArrayValues) {
                var i;
                if (arrayValues !== oldArrayValues) {
                    i = arrayValues.length;
                    while (i--) {
                        if (arrayValues[i] === value) {
                            elm.attr('checked', true); // check the checkbox if we found the obj
                            return;
                        }
                    }
                    elm.attr('checked', false); // otherwise uncheck it
                }
            }, true);
        }
    };
});