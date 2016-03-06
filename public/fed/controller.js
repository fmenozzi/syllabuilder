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

// Construct HTML representation of section contents
// TODO: Handle newlines in the textarea more elegantly in the final HTML
var constructHTML = function() {
	var html = "<html> <head></head> <body style='font-family: Arial;'>\n";

	for (section in sectionContents) {
		if (sectionContents.hasOwnProperty(section)) {	// Make sure it's our own property and not from the prototype
			if (sectionContents[section] !== "" && sectionContents[section] !== undefined) {
				html += "<h2>" + section + "</h2>\n";
				html += sectionContents[section] + "\n";
				html += "<p></p>\n\n"
			}
		}
	}

	html += "</body></html>";

	return html;
};

app.controller('main-controller', function($scope) {
	// Save contents of text editor to appropriate section
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

	// Preview current contents of section in another tab
	$scope.preview = function() {
		// Save current text to appropriate object
		$scope.saveSection($scope.text, $scope.currentSection, $scope.lastSection);

		// Create preview window in new tab
		var previewWindow = window.open();

		// Construct final HTML from section contents
		var html = constructHTML();

		// Write final HTML to preview window
		previewWindow.document.write(html);
	};

	// Masquerade section contents as .docx file by writing .html
	$scope.export = function() {
		// TODO: Implement me!
		var exportWindow = window.open();
		exportWindow.document.write("Implement me!");
	}
});