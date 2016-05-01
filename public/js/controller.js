var app = angular.module('syllabuilder', []);

// Needed for cross-browser (i.e modern browsers + IE10) download support
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
}]);

// The contents of each section
var sectionContents = {
    "Description":     "",
    "Objectives":      "",
    "Target Audience": "",
    "Prerequisites":   "",
    "Goals":           "",
    "Requirements":    "",
    "Policies":        "",
    "Resources":       "",
    "Materials":       "",
    "Grading":         "",
    "Exams":           "",
    "Honor Code":      "The University of North Carolina at Chapel Hill has had a student-led honor system for over 100 years. Academic integrity is at the heart of Carolina and we all are responsible for upholding the ideals of honor and integrity.  The student-led Honor System is responsible for adjudicating any suspected violations of the Honor Code and all suspected instances of academic dishonesty will be reported to the honor system. Information, including your responsibilities as a student is outlined in the Instrument of Student Judicial Governance. Your full participation and observance of the Honor Code is expected.",
    "Accessibility":   "The University of North Carolina at Chapel Hill ensures that no qualified person shall by reason of a disability be denied access to, participation in, or the benefits of, any program or activity operated by the University. Each qualified person shall receive reasonable accommodations to ensure equal access to educational opportunities, programs, and activities in the most integrated setting appropriate.",
    "Disclaimer":      "The professor reserves to right to make changes to the syllabus, including project due dates and test dates. These changes will be announced as early as possible.",
};

// Get all weekdays between FDOC and LDOC
var getDates = function(fdocstr, ldocstr) {
    // Get FDOC and LDOC as Date objects
    var fdoc = Date.parse(fdocstr);
    var ldoc = Date.parse(ldocstr);

    // Add all weekdays in between
    var date = fdoc.add(-1).day();
    var res = [];
    while (date.compareTo(ldoc) < 0) {
        date = date.add(1).day();
        if (!date.isWeekday())
            date = date.next().monday();
        res.push(date.clone());
    }

    return res;
}

var calendar = {
    "2016" : {
        "fall": {
            "fdoc": "tuesday aug 23 2016",
            "ldoc": "wednesday dec 07 2016",
        },
        "spring": {
            "fdoc": "monday jan 11 2016",
            "ldoc": "wednesday apr 27 2016",
        },
    },

    "2017" : {
        "fall": {
            "fdoc": "",     // TODO: Data doesn't exist yet
            "ldoc": "",     // TODO: Data doesn't exist yet
        },
        "spring": {
            "fdoc": "wednesday jan 11 2017",
            "ldoc": "friday apr 28 2017",
        }
    },
};

var getLocationSearch = function() {
		return location.search;
};

/* TODO:
 * Add Onyen authentication
 * Replace all DOM manipulation with Angular variables
 * Add a function to delete a saved syllabus
 */
app.controller('main-controller', function($scope, $window, $http, $document) {
    // Parse URL parameters to get year and semester
    var params = getLocationSearch().substring(1).split("&");
    var username = params[0].split("=")[1];
    var year     = params[1].split("=")[1];
    var semester = params[2].split("=")[1];

    $scope.fdocstr = calendar[year][semester]["fdoc"];
    $scope.ldocstr = calendar[year][semester]["ldoc"];

    $scope.dates = getDates($scope.fdocstr, $scope.ldocstr);
	
    $scope.checkDate = function(date) {
        var datestr = date.toString("ddd, MMM dd").substring(0, 2);
        if (datestr === "Mo" && $scope.mo ||
            datestr === "Tu" && $scope.tu ||
            datestr === "We" && $scope.we ||
            datestr === "Th" && $scope.th ||
            datestr === "Fr" && $scope.fr)
            return true;
        return false;
    };

	// Initialize weekday booleans
	$scope.mo = false;
	$scope.tu = false;
	$scope.we = false;
	$scope.th = false;
	$scope.fr = false;
	
    // Construct HTML representation of section contents
    // TODO: Handle newlines in the textarea more elegantly in the final HTML
    $scope.constructHTML = function() {
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

        // Add in prelude
        var courseName = document.getElementById("course-name").value;
        if (courseName === "")
            courseName = "<span style='color: red;'>[INSERT-COURSE-NAME-HERE]</span>";
        var deptId = document.getElementById("dept-id").value;
        if (deptId === "")
            deptId = "<span style='color: red;'>[INSERT-DEPT-ID-HERE]</span>";
        var courseNum = document.getElementById("course-num").value;
        if (courseNum === "")
            courseNum = "<span style='color: red;'>[INSERT-COURSE-NUMBER-HERE]</span>";
        var sectionNum = document.getElementById("section-num").value;
        if (sectionNum === "")
            sectionNum = "<span style='color: red;'>[INSERT-SECTION-NUMBER-HERE]</span>";
        var meetingDays = "";
        if ($scope.mo) meetingDays += "Mo";
        if ($scope.tu) meetingDays += "Tu";
        if ($scope.we) meetingDays += "We";
        if ($scope.th) meetingDays += "Th";
        if ($scope.fr) meetingDays += "Fr";
        var fromTime = document.getElementById("from-time").value;
        if (fromTime === "")
            fromTime = "<span style='color: red;'>[INSERT-START-TIME-HERE]</span>";
        var toTime = document.getElementById("to-time").value;
        if (toTime === "")
            toTime = "<span style='color: red;'>[INSERT-END-TIME-HERE]</span>";
        var meetingBuilding = document.getElementById("meeting-building").value;
        if (meetingBuilding === "")
            meetingBuilding = "<span style='color: red;'>[INSERT-MEETING-BUILDING-HERE]</span>";
        var meetingRoom = document.getElementById("meeting-room").value;
        if (meetingRoom === "")
            meetingRoom = "<span style='color: red;'>[INSERT-MEETING-ROOM-HERE]</span>";
        var courseWebsite  = document.getElementById("course-website").value;
        var instructorName = document.getElementById("instructor-name").value;
        if (instructorName === "")
            instructorName = "<span style='color: red;'>[INSERT-INSTRUCTOR-NAME-HERE]</span>";
        var instructorEmail = document.getElementById("instructor-email").value;
        if (instructorEmail === "")
            instructorEmail = "<span style='color: red;'>[INSERT-INSTRUCTOR-EMAIL-HERE]</span>";
        var instructorPhone       = document.getElementById("instructor-phone").value;
        var instructorOfficeHours = document.getElementById("instructor-office-hours").value;
        if (instructorOfficeHours === "")
            instructorOfficeHours = "<span style='color: red;'>[INSERT-INSTRUCTOR-OFFICE-HOURS-HERE]</span>";
        var instructorWebsite = document.getElementById("instructor-website").value;
        html += "<div style='font-size: 18pt; font-weight: bold;'>" + deptId.toUpperCase() + " " + courseNum + "-" + sectionNum + ": " + courseName+ "</div>";
        html += "<br>";
        html += "<br>";
        html += "<div class='prelude-header'>General Course Info</div>";
        html += "<br>";
        html += "<div class='prelude-contents'>Time: " + meetingDays + " from " + fromTime + " to " + toTime + "</div>";
        html += "<div class='prelude-contents'>Meeting Building: " + meetingBuilding + "</div>";
        html += "<div class='prelude-contents'>Meeting Room: " + meetingRoom + "</div>";
        if (courseWebsite !== "")
            html += "<div class='prelude-contents'>Website: " + courseWebsite + "</div>";
        html += "<br>";
        html += "<div class='prelude-header'>Instructor Info</div>";
        html += "<br>";
        html += "<div class='prelude-contents'>Name: " + instructorName + "</div>";
        html += "<div class='prelude-contents'>Email: " + instructorEmail + "</div>";
        if (instructorPhone !== "")
            html += "<div class='prelude-contents'>Phone: " + instructorPhone + "</div>";
        html += "<div class='prelude-contents'>Office Hours: " + instructorOfficeHours + "</div>";
        if (instructorWebsite !== "")
            html += "<div class='prelude-contents'>Website: " + instructorWebsite + "</div>";
        html += "<br>";

        // Add in sections
        for (section in sectionContents) {
            if (sectionContents.hasOwnProperty(section)) {
                if (sectionContents[section] !== "" && sectionContents[section] !== undefined) {
                    html += "<div class='section-header'>" + section + ": </div><br>";
                    html += "<div class='section-contents'>" + sectionContents[section] + "</div><br>";
                    html += "<br>";
                }
            }
        }

        // Add in schedule
        // TODO: If schedule is completely empty, don't include any of it
        html += "<table> <tr><th>Date</th> <th>Material Covered</th> <th>Homework</th></tr>";
        for (var i = 0; i < $scope.dates.length; i++) {
            var date = $scope.dates[i];
            if ($scope.checkDate(date)) {
                html += "<tr>";
                html += "<td>" + date.toString("ddd, MMM dd") + "</td>";
                html += "<td>" + document.getElementById("material_" + i).value + "</td>";
                html += "<td>" + document.getElementById("homework_" + i).value + "</td>";
                html += "</tr>";
            }
        }
        html += "</table>";

        html += "</body></html>";

        return html;
    };

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
        var html = $scope.constructHTML();

        // Write final HTML to preview window
        previewWindow.document.write(html);
    };

    // Export HTML to .docx file (Word will take care of the rest)
    $scope.exportDOCX = function() {
        // Save current text to appropriate object
        $scope.saveSection($scope.text, $scope.currentSection, $scope.lastSection);

        return $scope.constructHTML();
    };

    // Export HTML file for download, in case automatic conversion fails
    $scope.exportHTML = function() {
        // Save current text to appropriate object
        $scope.saveSection($scope.text, $scope.currentSection, $scope.lastSection);

        // Prompt file download
        $scope.html    = $scope.constructHTML();
        $scope.blob    = new Blob([$scope.html], { type: 'text/html' });
        $scope.fileUrl = ($window.URL || $window.webkitURL).createObjectURL($scope.blob);
    }

    // Clear all data
    $scope.clear = function() {
        if (confirm("Are you sure you want to clear all edit data?")) {
            // Clear prelude
            document.getElementById("course-name").value             = "";
            document.getElementById("dept-id").value                 = "";
            $scope.mo = false;
            $scope.tu = false;
            $scope.we = false;
            $scope.th = false;
            $scope.fr = false;
            document.getElementById("course-num").value              = "";
            document.getElementById("section-num").value             = "";
            document.getElementById("from-time").value               = "";
            document.getElementById("to-time").value                 = "";
            document.getElementById("meeting-building").value        = "";
            document.getElementById("meeting-room").value            = "";
            document.getElementById("course-website").value          = "";
            document.getElementById("instructor-name").value         = "";
            document.getElementById("instructor-email").value        = "";
            document.getElementById("instructor-phone").value        = "";
            document.getElementById("instructor-office-hours").value = "";
            document.getElementById("instructor-website").value      = "";

            // Clear section data
            for (section in sectionContents) {
                if (sectionContents.hasOwnProperty(section) && sectionContents[section] !== undefined) {
                    sectionContents[section] = "";
                }
            }

            // Clear text editor
            $scope.text = "";

            // Clear schedule
            for (var i = 0; i < $scope.dates.length; i++) {
                document.getElementById("material_" + i).value = "";
                document.getElementById("homework_" + i).value = "";
            }
        }
    }
	
	$scope.loadList = function() { // Get list of saved syllabus titles
		var success = function(resp) {
			console.log("Retrieved list "+JSON.stringify(resp.data));
			$scope.loadnames = resp.data;
		};
		var failure = function(resp) {
			console.log("List load failure! "+resp.data);
		};
		var listPath = "/list";
		$http.get(listPath, {params: { username: username }}).then(success, failure);
	}
	
	$scope.loadList(); // Initialize list of saved syllabi
	
	$scope.saveSyllabus = function(title) {
		var syllabus = constructJSON(username, title);

        var success = function(resp) {
			console.log("Saved syllabus "+username+'-'+title);
			alert("Save successful!");
			$scope.loadList(); // Refresh list of saved syllabi		
		};
        var failure = function(resp) {
			console.log("Save failure! "+resp.data);
			alert("Save failed! Error from the server: " +resp.data);
		};

		var postPath = "/save";
		$http.post(postPath, syllabus).then(success, failure);
	}
		
	$scope.loadSyllabus = function(title) {
        var success = function(resp) {
			console.log("Retrieved syllabus "+JSON.stringify(resp.data));
			$scope.populateFromJSON(resp.data);
		};
        var failure = function(resp) {
			console.log("Load failure! " + resp.data);
		};
        var getPath = "/load";

        $http.get(getPath, {params: {_id: username+'-'+title}}).then(success, failure);
	}
	
	// Compile form data into a JSON object for storage in database
	var constructJSON = function(username, title) {	
		// Construct timetable
		var timetable = [];
		 for (var j = 0; j < $scope.dates.length-5; j+=5) {
            if ($scope.mo) timetable[timetable.length] = {material: document.getElementById("material_" + j).value, homework: document.getElementById("homework_" + j).value}; 
			if ($scope.tu) timetable[timetable.length] = {material: document.getElementById("material_" + (j+1)).value, homework: document.getElementById("homework_" + (j+1)).value};           
			if ($scope.we) timetable[timetable.length] = {material: document.getElementById("material_" + (j+2)).value, homework: document.getElementById("homework_" + (j+2)).value};
			if ($scope.th) timetable[timetable.length] = {material: document.getElementById("material_" + (j+3)).value, homework: document.getElementById("homework_" + (j+3)).value};
			if ($scope.fr) timetable[timetable.length] = {material: document.getElementById("material_" + (j+4)).value, homework: document.getElementById("homework_" + (j+4)).value};
        }
		
		var json = {
			"_id": username+'-'+title,
			"course-info": {
				"course-name": document.getElementById('course-name').value,
				"course": {
					"dept-id": document.getElementById('dept-id').value,
					"course-num": parseInt(document.getElementById('course-num').value),
					"section-num": parseInt(document.getElementById('section-num').value),
				},
				"term": semester+' '+year,
				"from-time": document.getElementById('from-time').value,
				"to-time": document.getElementById('to-time').value,
				"meeting-building": document.getElementById('meeting-building').value,	
				"meeting-room": document.getElementById('meeting-room').value,
				"meetings": {
					"mo": $scope.mo,
					"tu": $scope.tu,
					"we": $scope.we,
					"th": $scope.th,
					"fr": $scope.fr
				},
				"website": document.getElementById('course-website').value,
			},
			"instructor-info": {
				"name": document.getElementById('instructor-name').value,
				"email": document.getElementById('instructor-email').value,
				"phone": document.getElementById('instructor-phone').value,
				"office-hours": document.getElementById('instructor-office-hours').value,
				"website": document.getElementById('instructor-website').value
			},
			"description": sectionContents["Description"],
			"objectives": sectionContents["Objectives"],
			"audience": sectionContents["Audience"],
			"prerequisites": sectionContents["Prerequisites"],
			"goals": sectionContents["Goals"],
			"requirements": sectionContents["Requirements"],
			"policies": sectionContents["Policies"],
			"resources": sectionContents["Resources"],
			"materials": sectionContents["Materials"],
			"grading": sectionContents["Grading"],
			"exams": sectionContents["Exams"],
			"honor-code": sectionContents["Honor Code"],
			"accessibility": sectionContents["Accessibility"],
			"disclaimer": sectionContents["Disclaimer"],
			"time-table": timetable
		};
		
		return json;
	}
	
	// Populate the page from a loaded syllabus. Warning, will overwrite the existing data...
	$scope.populateFromJSON = function(syllabus) {
		// Populate syllabus title
		var id = syllabus['_id'];
		$scope.savename											 = id.slice(id.indexOf('-')+1, id.length);
		
		// Populate prelude
		document.getElementById("course-name").value             = syllabus['course-info']['course-name'];
        document.getElementById("dept-id").value                 = syllabus['course-info']['course']['dept-id'];
        $scope.mo  												 = syllabus['course-info']['meetings']['mo'];
        $scope.tu  												 = syllabus['course-info']['meetings']['tu'];
		$scope.we  												 = syllabus['course-info']['meetings']['we'];
		$scope.th  												 = syllabus['course-info']['meetings']['th'];
		$scope.fr 	 											 = syllabus['course-info']['meetings']['fr'];
		document.getElementById("course-num").value              = syllabus['course-info']['course']['course-num'];
		document.getElementById("section-num").value             = syllabus['course-info']['course']['section-num'];
		document.getElementById("from-time").value               = syllabus['course-info']['from-time'];
		document.getElementById("to-time").value                 = syllabus['course-info']['to-time'];
		document.getElementById("meeting-building").value        = syllabus['course-info']['meeting-building'];
		document.getElementById("meeting-room").value            = syllabus['course-info']['meeting-room'];
		document.getElementById("course-website").value          = syllabus['course-info']['website'];
		document.getElementById("instructor-name").value         = syllabus['instructor-info']['name'];
		document.getElementById("instructor-email").value        = syllabus['instructor-info']['email'];
		document.getElementById("instructor-phone").value        = syllabus['instructor-info']['phone'];
		document.getElementById("instructor-office-hours").value = syllabus['instructor-info']['office-hours'];
		document.getElementById("instructor-website").value      = syllabus['instructor-info']['website'];
		
		// Populate section data
		$scope.saveSection(syllabus["description"], $scope.currentSection, "Description");
		$scope.saveSection(syllabus["objectives"], $scope.currentSection, "Objectives");
		$scope.saveSection(syllabus["prerequisites"], $scope.currentSection, "Prerequisites");
		$scope.saveSection(syllabus["goals"], $scope.currentSection, "Goals");
		$scope.saveSection(syllabus["requirements"], $scope.currentSection, "Requirements");
		$scope.saveSection(syllabus["policies"], $scope.currentSection, "Policies");
		$scope.saveSection(syllabus["resources"], $scope.currentSection, "Resources");
		$scope.saveSection(syllabus["materials"], $scope.currentSection, "Materials");
		$scope.saveSection(syllabus["grading"], $scope.currentSection, "Grading");
		$scope.saveSection(syllabus["exams"], $scope.currentSection, "Exams");
		$scope.saveSection(syllabus["honor-code"], $scope.currentSection, "Honor Code");
		$scope.saveSection(syllabus["accessibility"], $scope.currentSection, "Accessibility");
		$scope.saveSection(syllabus["disclaimer"], $scope.currentSection, "Disclaimer");
		
		// Populate timetable
		$document.ready(function () { // Wait for the DOM to update according to loaded dates
			var timetable = syllabus['time-table'];
			var j = 0;
			for (var i = 0; i < $scope.dates.length-5; i+=5) {
				if ($scope.mo) { 
					document.getElementById("material_"+i).value = timetable[j]['material'];
					document.getElementById("homework_"+i).value = timetable[j]['homework'];
					j++;
				}
				if ($scope.tu) {
					document.getElementById("material_"+(i+1)).value = timetable[j]['material'];
					document.getElementById("homework_"+(i+1)).value = timetable[j]['homework'];
					j++;
				}
				if ($scope.we) {
					document.getElementById("material_"+(i+2)).value = timetable[j]['material'];
					document.getElementById("homework_"+(i+2)).value = timetable[j]['homework'];
					j++;
				}
				if ($scope.th) { 
					document.getElementById("material_"+(i+3)).value = timetable[j]['material'];
					document.getElementById("homework_"+(i+3)).value = timetable[j]['homework'];
					j++;
				}
				if ($scope.fr) {
					document.getElementById("material_"+(i+4)).value = timetable[j]['material'];
					document.getElementById("homework_"+(i+4)).value = timetable[j]['homework'];
					j++;
				}
			}
		});
		
	}
});
