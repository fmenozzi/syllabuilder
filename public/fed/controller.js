var app = angular.module('syllabuilder', []);

var savedSections = {
	"Title": 		 "",
	"Course Info":   "",  
	"Objectives":    "",
	"Description":   "",
	"Prerequisites": "",
	"Required Text": "",
	"Grading":       "",
	"Exams":         "",
	"Honor Code":    "",
	"Disclaimer":    "",
};

app.controller('keep-track-of-text', function($scope) {
	$scope.saveSection = function(text, currentSection, lastSection) {
		// Toggle button background colors
		document.getElementById(lastSection).style.background    = "#ffffff";
		document.getElementById(currentSection).style.background = "#dddddd";

		// Set default placeholder text to be current section being edited
		$scope.placeholderText = currentSection;

		// Save current text to last section edited
		savedSections[lastSection] = text;

		// Update current text with current section
		$scope.text = savedSections[currentSection];

		// Update last section
		$scope.lastSection = currentSection;
	};
});