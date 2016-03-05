/*-angular.module('ngToggle', [])
    .controller('AppCtrl',['$scope', function($scope){
        $scope.title = true;
        $scope.toggleTitle = function() {
            $scope.title = $scope.title === false ? true: false;
        };
}]);*/
var app = angular.module("App", []);

app.controller('AppCtrl', ['$scope', function($scope1) {
  $scope1.text01 = 'Click here to edit the text. After done editing click back on the same tab again.';
  $scope1.editmode = false;
  $scope1.toggleEditMode = function(){
    $scope1.editmode = $scope1.editmode === false ? true: false;	
  }
}]);

app.directive("contenteditable", function() {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});
