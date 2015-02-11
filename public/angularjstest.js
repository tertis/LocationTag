/**
 * Created by tertis on 15. 2. 12..
 */
angular.module("myapp", [])
    .controller("MyController", function($scope) {
        $scope.myForm = {};
        $scope.myForm.firstName = "Jakob";
        $scope.myForm.lastName  = "Jenkov";
    } );
