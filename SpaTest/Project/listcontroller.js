routerApp.controller('listcontroller', function ($scope) {
    $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
    $scope.info = function () {
        alert("haha");
    }
});