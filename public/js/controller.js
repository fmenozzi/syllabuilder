var app = angular.module('syllabuilder', []);

// Needed for cross-browser (i.e modern browsers + IE10) download support
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
}]);

// The contents of each section
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
	var html = "<!DOCTYPE html><html> <head></head>\n";

	// Set style
	html += "<style type='text/css'>";
	html += "	.section-header {";
	html += "		font-size: 12pt;";
	html += "		font-weight: bold;";
	html += "	}";
	html += "	.section-contents {";
	html += "		font-size: 12pt;";
	html += "	}";
	html += "	body {";
	html += "		margin: 1in;";
	html += "		font-family: Arial;";
	html += "	}";
	html += "	table {";
	html += "		width: 100%;";
	html += "	}";
	html += "	th, td {";
	html += "		padding: 5px;";
	html += "		text-align: left;";
	html += "	}";
	html += "	table, th, td {";
	html += "		border: 1px solid black;";
	html += "		border-collapse: collapse;";
	html += "	}";
	html += "	table th {";
	html += "		background-color: white;";
	html += "		color: black;";
	html += "	}";
	html += "	table input {";
	html += "		width: 99%;";
	html += "	}";
	html += "</style>";

	// Add in sections
	for (section in sectionContents) {
		if (sectionContents.hasOwnProperty(section)) {
			if (sectionContents[section] !== "" && sectionContents[section] !== undefined) {
				html += "<span class='section-header'>" + section + ": </span>";
				html += "<span class='section-contents'>" + sectionContents[section] + "</span>";
				html += "<br><br>";
			}
		}
	}

	html += "</body></html>";

	return html;
};

// Get all dates between FDOC and LDOC
var getDates = function(fdocstr, ldocstr) {
	var fdoc = Date.parse(fdocstr);
	var ldoc = Date.parse(ldocstr);

	// Let's consider MoWe classes for now
	var date = fdoc.add(-1).day();
	var res = [];
	while (true) {
		date = date.next().monday();
		if (date.compareTo(ldoc) > 0)
			break;
		res.push(date.clone());

		date = date.next().wednesday();
		if (date.compareTo(ldoc) > 0)
			break;
		res.push(date.clone());
	}

	return res;
}

app.controller('main-controller', function($scope, $window) {
	// Save contents of text editor to appropriate section
	$scope.saveSection = function(text, currentSection, lastSection) {
		// Toggle button background colors
		document.getElementById(lastSection).style.background    = "white";
		document.getElementById(currentSection).style.background = "#235d86";
		document.getElementById(lastSection).style.color    = "#575757";
		document.getElementById(currentSection).style.color = "white";

		// Set current section
		$scope.currentSection = currentSection;

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

	// Export HTML to .docx file (Word will take care of the rest)
	$scope.export = function() {
		// Save current text to appropriate object
		$scope.saveSection($scope.text, $scope.currentSection, $scope.lastSection);

		/*
		// Prompt file download
		$scope.html    = constructHTML();
		$scope.blob    = new Blob([$scope.html], { type: 'text/html' });
		$scope.fileUrl = ($window.URL || $window.webkitURL).createObjectURL($scope.blob);
		*/
		return constructHTML();
	};

	// Clear all data
	$scope.clear = function() {
		if (confirm("Are you sure you want to clear all edit data?")) {
			// Clear section data
			for (section in sectionContents) {
				if (sectionContents.hasOwnProperty(section) && sectionContents[section] !== undefined) {
					sectionContents[section] = "";
				}
			}

			// Clear text editor
			$scope.text = "";
		}
	}

	$scope.testSettingMaterialHomeworkValues = function() {
		var numEntries = $scope.dates.length;
		for (var i = 0; i < numEntries; i++) {
			document.getElementById('material_' + i).value = "Material " + i;
			document.getElementById('homework_' + i).value = "Homework " + i;
		}
	}

	$scope.dates = getDates('monday mar 14', 'monday apr 04');
});
