var app = angular.module('test-app', []);

app.controller('basic-name-controller', function($scope) {
	// Default name in first input field
	$scope.firstName = "John";
	$scope.lastName = "Doe";
	$scope.fullName = function() {
		return $scope.firstName + " " + $scope.lastName;
	};

	// Default color in second input field
	$scope.inputcolor = "red";
});

app.controller('ng-repeat-controller', function($scope) {
	$scope.people = [
        {name: 'Fed',     gender: 'Male'},
		{name: 'Cassidy', gender: 'Male'},
		{name: 'Mark',    gender: 'Male'},
		{name: 'Devi',    gender: 'Female'},
    ];
});

app.controller('filter-controller', function($scope) {
	$scope.names = [
		"Abigail",
		"Jeremy",
		"Andrew",
		"Anthony",
		"Betsy",
		"Bernard",
		"John",
		"Cassie",
	];
});

app.controller('basic-services-controller', function($scope, $location, $interval) {
	// Show absolute path of index.html
	$scope.url = $location.absUrl();

	// Display current time every second
	$scope.time = new Date().toLocaleTimeString();
	$interval(function() {
        $scope.time = new Date().toLocaleTimeString();
    }, 1000);
});

app.controller('basic-http-controller', function($scope, $http) {
	// Use localhost on port 8000 as a test server
	$scope.serverURL = "http://localhost:8000/";

	$http.get($scope.serverURL).then(
	function(response) { // Success
        $scope.resp = "Success! ("+response.status+"): " + response.data;
    },
    function(response) { // Failure
    	$scope.resp = "Failure! " + response.status;
    });
});

app.controller('dragula-controller', function($scope) {
	$scope.item1 = "Item 1";
	$scope.item2 = "Item 2";
	$scope.item3 = "Item 3";
	$scope.item4 = "Item 4";
});