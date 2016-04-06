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
			affix('input[value="a"]#course-name .course-info');
			affix('input[value="COMP"]#dept-id .course-info');
			affix('input[value="1"]#course-num .course-info');
			affix('input[value="1"]#section-num .course-info');
			affix('input[value="b"]#course-website .course-info');
			affix('input[value="3:00"]#from-time .course-info');
			affix('input[value="4:00"]#to-time .course-info');
			affix('input[value="Brooks"]#meeting-building .course-info');
			affix('input[value="FB009"]#meeting-room .course-info');
			affix('input[value="Stotts"]#instructor-name .instructor-info');
			affix('input[value="a@b.c"]#instructor-email .instructor-info');
			affix('input[value="4"]#instructor-phone .instructor-info');
			affix('input[value="d"]#instructor-website .instructor-info');
			affix('input[value="e"]#instructor-office-hours .instructor-info');

			console.log(document.getElementById("course-name").value);
			for (var i = 0; i < $scope.dates.length; i++) {
				affix('.schedule#material_'+i+' input[value="stuff"]');
				affix('.schedule#homework_'+i+' input[value="stuff"]');
			}
		});
		it('clears all data on the page', function() {
			var $scope = {};
			var controller = $controller('main-controller', {$scope: $scope});
			 spyOn(window, 'confirm').and.returnValue(true);
			 $scope.clear();
			 expect(document.getElementById("course-name").value).toEqual("");
			 expect(document.getElementById("dept-id").value).toEqual("");
			 expect($scope.mo).toBe(false);
			 expect($scope.tu).toBe(false);
			 expect($scope.we).toBe(false);
			 expect($scope.th).toBe(false);
			 expect($scope.fr).toBe(false);
			 expect(document.getElementById("course-num").value).toEqual("");
			 expect(document.getElementById("from-time").value).toEqual("");
			 expect(document.getElementById("to-time").value).toEqual("");
			 expect(document.getElementById("meeting-building").value).toEqual("");
			 expect(document.getElementById("meeting-room").value).toEqual("");
			 expect(document.getElementById("course-website").value).toEqual("");
			 expect(document.getElementById("instructor-name").value).toEqual("");
			 expect(document.getElementById("instructor-phone").value).toEqual("");
			 expect(document.getElementById("instructor-office-hours").value).toEqual("");
			 expect(document.getElementById("instructor-website").value).toEqual("");

			 for (section in sectionContents) {
				 if (sectionContents.hasOwnProperty(section) && sectionContents[section] !== undefined) {
                    expect(sectionContents[section]).toEqual("");
                }
			 }
			 
			 for (var i = 0; i < $scope.dates.length; i++) {
				expect(document.getElementById("material_"+i).value).toEqual("");
				expect(document.getElementById("homework_"+i).value).toEqual("");
			}
			
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
