$scope.about = function () {
    var modal = new Modal($scope, 'about');
    modal.open().then(function () {
        $log.log("modal opened!");
    });
};