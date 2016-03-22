var app = angular.module('syllabuilder', []);

// Needed for cross-browser (i.e modern browsers + IE10) download support
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
}]);

// The contents of each section
// TODO: Make placeholder text a hint about what to include
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
    "Honor Code":      "",
    "Accessibility":   "",
    "Disclaimer":      "",
};

// Get all weekdays between FDOC and LDOC
var getDates = function(fdocstr, ldocstr) {
    // Get FDOC and LDOC as Date objects
    var fdoc = Date.parse(fdocstr);
    var ldoc = Date.parse(ldocstr);

    // Add all weekdays in between
    var date = fdoc.add(-1).day();
    var res = [];
    while (date.compareTo(ldoc) <= 0) {
        date = date.add(1).day();
        if (!date.isWeekday())
            date = date.next().monday();
        res.push(date.clone());
    }

    return res;
}

app.controller('main-controller', function($scope, $window, $http) {
    $scope.fdocstr = "monday mar 14";
    $scope.ldocstr = "monday apr 04";

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
        var deptId     = document.getElementById("dept-id").value;
        var courseNum  = document.getElementById("course-num").value;
        var sectionNum = document.getElementById("section-num").value;
        var meetingDays = "";
        if ($scope.mo) meetingDays += "Mo";
        if ($scope.tu) meetingDays += "Tu";
        if ($scope.we) meetingDays += "We";
        if ($scope.th) meetingDays += "Th";
        if ($scope.fr) meetingDays += "Fr";
        var fromTime              = document.getElementById("from-time").value;
        var toTime                = document.getElementById("to-time").value;
        var meetingBuilding       = document.getElementById("meeting-building").value;
        var meetingRoom           = document.getElementById("meeting-room").value;
        var courseWebsite         = document.getElementById("course-website").value;
        var instructorName        = document.getElementById("instructor-name").value;
        var instructorEmail       = document.getElementById("instructor-email").value;
        var instructorPhone       = document.getElementById("instructor-phone").value;
        var instructorOfficeHours = document.getElementById("instructor-office-hours").value;
        var instructorWebsite     = document.getElementById("instructor-website").value;
        html += "<div style='font-size: 18pt; font-weight: bold;'>" + deptId + " " + courseNum + "-" + sectionNum + ": " + courseName+ "</div>";
        html += "<br>";
        html += "<br>";
        html += "<div class='prelude-header'>General Course Info</div>";
        html += "<br>";
        html += "<div class='prelude-contents'>Time: " + meetingDays + " from " + fromTime + " to " + toTime + "</div>";
        html += "<div class='prelude-contents'>Meeting Building: " + meetingBuilding + "</div>";
        html += "<div class='prelude-contents'>Meeting Room: " + meetingRoom + "</div>";
        html += "<div class='prelude-contents'>Website: " + courseWebsite + "</div>";
        html += "<br>";
        html += "<div class='prelude-header'>Instructor Info</div>";
        html += "<br>";
        html += "<div class='prelude-contents'>Name: " + instructorName + "</div>";
        html += "<div class='prelude-contents'>Email: " + instructorEmail + "</div>";
        html += "<div class='prelude-contents'>Phone: " + instructorPhone + "</div>";
        html += "<div class='prelude-contents'>Office Hours: " + instructorOfficeHours + "</div>";
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
            document.getElementById("meeting-location").value        = "";
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

    // Success and failure callbacks
    /*
    var success = function(resp) {$scope.resp = "Success! " + resp.data;};
    var failure = function(resp) {$scope.resp = "Failure! " + resp.status;};

    $http.get("http://syllabuilder-menozzi.apps.unc.edu/test").then(success, failure);
    */
});