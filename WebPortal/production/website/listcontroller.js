routerApp.controller('listcontroller', function ($scope, $state) {
    $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
    $scope.info = function () {
        alert("haha");
        $state.go("about");
    };

    $scope.detail = function () {
        $state.go("list.detail");
    };
});