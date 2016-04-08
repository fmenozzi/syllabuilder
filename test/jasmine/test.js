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
			affix('input[value="FB009"]#meeting-room .course-info');			affix('.instructor-info#instructor-name input[value="d"]');
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
	describe('$scope.constructHTML', function() {
		beforeEach(function() {
			var $scope = {};
			var controller = $controller('main-controller', {$scope: $scope});
		});

		it('constructs html', function() {
			var $scope = {};
			var controller = $controller('main-controller', {$scope: $scope});

        var html = "<!DOCTYPE html><html> <head></head>\n";
        // Set style
        html += "<style type='text/css'>";
        html += "   .section-header, .prelude-header {";
        html += "       font-size: 12pt;";
        html += "       font-weight: bold;";
        html += "   }";
        html += "   .section-contents, .prelude-contents {";
        html += "       font-size: 12pt;";
        html += "   }";
        html += "   body {";
        html += "       margin: 1in;";
        html += "       font-family: Arial;";
        html += "   }";
        html += "   table {";
        html += "       width: 100%;";
        html += "   }";
        html += "   th, td {";
        html += "       padding: 5px;";
        html += "       text-align: left;";
        html += "   }";
        html += "   table, th, td {";
        html += "       border: 1px solid black;";
        html += "       border-collapse: collapse;";
        html += "   }";
        html += "   table th {";
        html += "       background-color: white;";
        html += "       color: black;";
        html += "   }";
        html += "   table input {";
        html += "       width: 99%;";
        html += "   }";
        html += "</style>";

        html += "<div style='font-size: 18pt; font-weight: bold;'>COMP 523-001: Software</div>";
        html += "<br>";
        html += "<br>";
        html += "<div class='prelude-header'>General Course Info</div>";
        html += "<br>";
        html += "<div class='prelude-contents'>Time:  from 1 to 2</div>";
        html += "<div class='prelude-contents'>Meeting Building: sitterson</div>";
        html += "<div class='prelude-contents'>Meeting Room: 09</div>";
        html += "<div class='prelude-contents'>Website: cs.unc.edu</div>";
        html += "<br>";
        html += "<div class='prelude-header'>Instructor Info</div>";
        html += "<br>";
        html += "<div class='prelude-contents'>Name: Stotts</div>";
        html += "<div class='prelude-contents'>Email: stotts@cs.unc.edu</div>";
        html += "<div class='prelude-contents'>Phone: 919-962-8506</div>";
        html += "<div class='prelude-contents'>Office Hours: 1</div>";
        html += "<div class='prelude-contents'>Website: c</div>";
        html += "<br>";

	for (section in sectionContents) {
            if (sectionContents.hasOwnProperty(section)) {
                if (sectionContents[section] !== "" && sectionContents[section] !== undefined) {
                    html += "<div class='section-header'>Description: </div><br>";
                    html += "<div class='section-contents'>COMP 523</div><br>";
                    html += "<br>";
                }
            }
        }		
		html += "<table> <tr><th>Date</th> <th>Material Covered</th> <th>Homework</th></tr>";
     for (var i = 0; i < $scope.dates.length; i++) {
            var date = $scope.dates[i];
            if ($scope.checkDate(date)) {
                html += "<tr>";
                html += "<td>Mon, Jan 11</td>";
                html += "<td>" + document.getElementById("material_" + i).value + "</td>";
                html += "<td>" + document.getElementById("homework_" + i).value + "</td>";
                html += "</tr>";
            }
        }
        html += "</table>";

        html += "</body></html>";
		
			affix('input[value="Software"]#course-name .course-info');
			affix('input[value="COMP"]#dept-id .course-info');
			affix('input[value="523"]#course-num .course-info');
			affix('input[value="001"]#section-num .course-info');
			affix('input[value="cs.unc.edu"]#course-website .course-info');
			affix('input[value="1"]#from-time .course-info');
			affix('input[value="2"]#to-time .course-info');
			affix('input[value="sitterson"]#meeting-building .course-info');
			affix('input[value="09"]#meeting-room .course-info');			
			affix('input[value="Stotts"]#instructor-name .instructor-info');
			affix('input[value="stotts@cs.unc.edu"]#instructor-email .instructor-info');
			affix('input[value="919-962-8506"]#instructor-phone .instructor-info');
			affix('input[value="c"]#instructor-website .instructor-info');
			affix('input[value="1"]#instructor-office-hours .instructor-info'); 
			
			 expect($scope.constructHTML()).toEqual(html);
		});
	});
  
});

