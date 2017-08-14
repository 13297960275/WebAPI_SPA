routerApp.controller('listcontroller', function ($scope, $stateParams) {
    $stateParams.app = 'zh-cn';
    alert($stateParams.app);
    $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
    $scope.info = function () {
        alert("haha");
    }
});