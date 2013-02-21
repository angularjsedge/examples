// futureTime directive sets validity of text input box if the user types in a parsable time that is in the future
blog.directive('futureTime', function () {
    return {
        require: '?ngModel',
        link: function (scope, elm, attrs, ngModel) {
            // no 'get()' in jqLite; use elm as array to get at the DOM node object
            if (!ngModel || attrs.type !== 'text' || elm[0].tagName.toLowerCase() !== 'input') {
                return; // do nothing if no ngModel specified OR the input field is not of type "text"
            }
            // we want this to be the first check we do, in case there are others.
            // whatever we return from this function ends up as the view value, so if you want to clear invalid input,
            // simply return nothing.
            ngModel.$parsers.unshift(function (view_value) {
                var ts, nows;
                // first case: empty field. this is OK
                if (!view_value) {
                    ngModel.$setValidity('futureTime', true);
                    return;
                }
                // second case: unparsable date
                ts = Date.parse(view_value);
                if (isNaN(ts) || ts < 0) {
                    ngModel.$setValidity('futureTime', false);
                    return view_value;
                }
                // third case: valid date, but in the past or present
                nows = new Date().getTime();
                if (ts <= nows) {
                    ngModel.$setValidity('futureTime', false);
                    return view_value;
                }
                // fourth case: future date!
                ngModel.$setValidity('futureTime', true);
                return view_value;
            });
        }
    };
});