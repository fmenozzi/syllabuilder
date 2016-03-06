var app = angular.module('syllabuilder', []);

var sectionContents = {
	"Title": 		 "",
	"Course Info":   "",
	"Description":   "",
	"Objectives":    "",
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
		document.getElementById(currentSection).style.background = "#e0e0e0";

		// Set default placeholder text to be current section being edited
		$scope.placeholderText = currentSection;

		// Save current text to last section edited
		sectionContents[lastSection] = text;

		// Update current text with current section
		$scope.text = sectionContents[currentSection];

		// Update last section
		$scope.lastSection = currentSection;
	};
});

app.controller('bottom-buttons-controller', function($scope) {
	$scope.preview = function() {
		var previewWindow = window.open();
		previewWindow.document.write("<html> <head></head> <body>Hello, World!</body> </html>");
	};
});