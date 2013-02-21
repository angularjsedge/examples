// promise method

function ParentCtrl($q, $http) {
    $scope.getFoo = function () {
        return $http.get('foo.url').success(function (data) {
            $scope.foo = data;
        });
    };
}
function ChildCtrl() {
    $scope.getFoo().then(function () {
        // do something with $scope.foo
    };
}

//And the alternative:

//$watch method

function ParentCtrl($http) {
    $scope.getFoo = function () {
        $http.get('foo.url').success(function (data) {
            $scope.foo = data;
        });
    };
}
function ChildCtrl() {
    var foo_watch = $scope.$watch('foo', function (foo, old_foo) {
        if (foo !== old_foo && !!foo) {
            // do something with foo
            foo_watch(); // stop watching
        }
    });
    $scope.getFoo();
}
