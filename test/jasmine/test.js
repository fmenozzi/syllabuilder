describe('app', function() {
	beforeEach(module('syllabuilder'));
	
	var $controller;
	
	beforeEach(inject(function(_$controller_, _$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		jQuery(document).read(function($) {
			var body = $('body');
		});
    }));
	
	describe('$scope.clear', function() {
		it('clears all data on the page', function() {
			 jasmine.getFixtures().fixturesPath = 'base';
			 loadFixtures('myfixture.html');
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
		it('saves the text of the last section edited to sectionContents', function() {
			var $scope = {};
			var controller = $controller('main-controller', { $scope: $scope });
			$scope.saveSection("COMP 523", 'Objectives', 'Description');
			expect(sectionContents["Description"]).toEqual("COMP 523");
		});
	});
  
});
