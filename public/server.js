var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var year;
var semester;
var url='http://registrar.unc.edu/academic-calendar/academic-calendars-2015-2016-and-2016-2017/';

 function retreiveData(year, semester){
	 if (year == 2016 && semester == 'fall'){
		request(url, function(error, response, html){
			if(!error)
	 		var $ = cheerio.load(html);

	 		var row = $($("span:contains('Classes Begin')")[0]).parent().parent();//the [0] in row looks for the first classes begin date (i.e,fall classes begin date)
	 		var datebox = $(row).find('td')[2];//the [2] indicates date in 3rd column
	 		var date = $(datebox).text();
	 		console.log('Classes Begin', date);
	 		
	 		var row2 = $($("span:contains('Classes End')")[0]).parent().parent();  
	 		var datebox = $(row2).find('td')[2];
	 		var date2 = $(datebox).text();
	 		console.log('Classes End', date2);

	 	   var row3 = $($("span:contains('Labor Day')")[0]).parent().parent();  
		   var datebox = $(row3).find('td')[2];
		   var date3 = $(datebox).text();
		   console.log('Labor Day', date3);

		   var row4 = $($("span:contains('University Day')")[0]).parent().parent();  
		   var datebox = $(row4).find('td')[2];
		   var date4 = $(datebox).text();
		   console.log('University Day', date4);

		   var row5 = $($("span:contains('Fall Break')")[0]).parent().parent();  
		   var datebox = $(row5).find('td')[2];
		   var date5 = $(datebox).text();
		   console.log('Fall Break', date5);

		   var row6 = $($("span:contains('Thanksgiving Recess')")[0]).parent().parent();  
		   var datebox = $(row6).find('td')[2];
		   var date6 = $(datebox).text();
		   console.log('Thanksgiving Recess', date6);

		   var row7 = $($("span:contains('Reading Days')")[0]).parent().parent();  
		   var datebox = $(row7).find('td')[2];
		   var date7 = $(datebox).text();
		   console.log('Reading Days', date7); 
	 		})
	 		}
	 else if (year == 2017 && semester == 'spring'){
	 	request(url, function(error, response, html){
		if(!error)
	 		var $ = cheerio.load(html);
	 		var row = $($("span:contains('Classes Begin')")[1]).parent().parent();//the [1] in row looks for the second classes begin date (i.e,spring classes begin date)
	 		var datebox = $(row).find('td')[2];//the [2] indicates date in 3rd column
	 		var date = $(datebox).text();
	 		console.log('Classes Begin', date);
	 		var row2 = $($("span:contains('Classes End')")[1]).parent().parent();  
	 		var datebox = $(row2).find('td')[2];
	 		var date2 = $(datebox).text();
	 		console.log('Classes End', date2);
	 		var row3 = $($("span:contains('Labor Day')")[1]).parent().parent();  
		   var datebox = $(row3).find('td')[2];
		   var date3 = $(datebox).text();
		   console.log('Labor Day', date3);

		   var row4 = $($("span:contains('University Day')")[1]).parent().parent();  
		   var datebox = $(row4).find('td')[2];
		   var date4 = $(datebox).text();
		   console.log('University Day', date4);

		   var row5 = $($("span:contains('Fall Break')")[1]).parent().parent();  
		   var datebox = $(row5).find('td')[2];
		   var date5 = $(datebox).text();
		   console.log('Fall Break', date5);

		   var row6 = $($("span:contains('Thanksgiving Recess')")[1]).parent().parent();  
		   var datebox = $(row6).find('td')[2];
		   var date6 = $(datebox).text();
		   console.log('Thanksgiving Recess', date6);

		   var row7 = $($("span:contains('Reading Days')")[1]).parent().parent();  
		   var datebox = $(row7).find('td')[2];
		   var date7 = $(datebox).text();
		   console.log('Reading Days', date7); 
	 	})
	 	}
}
//to test for different years and semester, change the year and semester here
retreiveData(2016,'fall');


