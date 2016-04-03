describe('app', function() {
	beforeEach(module('syllabuilder'));
	
	var $controller;
	
	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		spyOn(window, 'getLocationSearch').and.returnValue('year=2016&semester=spring'); // stub getLocationSearch function
    }));
	
	describe('$scope.clear', function() {
		beforeEach(function() {
			var $scope = {};
			var controller = $controller('main-controller', {$scope: $scope});
			affix('.course-info#course-name');
			affix('.course-info#dept-id');
			affix('.course-info#course-num');
			affix('.course-info#section-num');
			affix('.course-info#from-time');
			affix('.course-info#to-time');
			affix('.course-info#meeting-location');
			affix('.course-info#course-website');
			affix('.instructor-info#instructor-name');
			affix('.instructor-info#instructor-email');
			affix('.instructor-info#instructor-phone');
			affix('.instructor-info#instructor-office-hours');
			affix('.instructor-info#instructor-website');
			for (var i = 0; i < $scope.dates.length; i++) {
				affix('.schedule#material_'+i);
				affix('.schedule#homework_'+i);
			}
		});
		it('clears all data on the page', function() {
			var $scope = {};
			var controller = $controller('main-controller', {$scope: $scope});
			 spyOn(window, 'confirm').and.returnValue(true);
			 $scope.clear();
			 expect($scope.mo).toBe(false);
			 expect($scope.tu).toBe(false);
			 expect($scope.we).toBe(false);
			 expect($scope.th).toBe(false);
			 expect($scope.fr).toBe(false);
			 expect($scope.text).toEqual("");
		});
	});
	
	describe('$scope.saveSection', function() {
		beforeEach(function() {
			affix('.button#Description');
			affix('.button#Objectives');
		});
		it('saves the text of the last section edited to sectionContents', function() {
			var $scope = {};
			var controller = $controller('main-controller', {$scope: $scope});
			$scope.saveSection("COMP 523", 'Objectives', 'Description');
			expect(sectionContents["Description"]).toEqual("COMP 523");
		});
	});
  
});
