describe('basic-name-controller', function() {
	beforeEach(module('test-app'));
	
	var $controller;
	
	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
    }));
	
	describe('$scope.fullName', function() {
		it('sets fullName to the concatenation of firstName and lastName, with a space between', function() {
			var $scope = {};
			var controller = $controller('basic-name-controller', { $scope: $scope });
			$scope.firstName = "foo";
			$scope.lastName = "bar";
			expect($scope.fullName()).toEqual("foo bar");
		});
	});
  
});
