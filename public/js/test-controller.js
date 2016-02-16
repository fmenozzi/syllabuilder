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
    // Use server at localhost:8000
    var baseURL = "http://localhost:8000";
    var getPath = "/test";

    $scope.serverURL = baseURL + getPath;

    // Success and failure callbacks
    var success = function(resp) {$scope.titles = resp.data.titles;};
    var failure = function(resp) {$scope.titles = "Failure! " + resp.status;};

    // Make GET request to retrieve sample JSON using query "?titles=all"
    $http.get(getPath, {params: {titles: "all"}}).then(success, failure);
});

app.controller('dragula-controller', function($scope) {
    $scope.item1 = "Item 1";
    $scope.item2 = "Item 2";
    $scope.item3 = "Item 3";
    $scope.item4 = "Item 4";
});