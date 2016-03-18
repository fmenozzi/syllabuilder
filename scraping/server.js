var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var year;
var semester;

function retreiveData(year,semester){

 //lots of if statements to select correct url; retreive code using your urls
 if(year == 2014 && semester == 'fall'){
  url='http://registrar.unc.edu/academic-calendar/academic-calendars-2014-2015-2015-2016/'
	
	request(url, function(error, response, html){
		if(!error)
	        var $ = cheerio.load(html);
	 	$("span:contains('Classes Begin')");
	 	//the [0] gets the first classes begin date
	   var row = $($("span:contains('Classes Begin')")[0]).parent().parent();
	   var datebox = $(row).find('td')[1];
	   var date = $(datebox).text();
	   console.log('Classes Begin', date);

	   $("span:contains('Classes End')");
	   var row2 = $($("span:contains('Classes End')")[0]).parent().parent();  
	   var datebox = $(row2).find('td')[1];
	   var date2 = $(datebox).text();
	   console.log('Classes End', date2);
	    })
	}
 	else if(year == 2015 && semester == 'spring'){
  	url='http://registrar.unc.edu/academic-calendar/academic-calendars-2014-2015-2015-2016/'
		
		request(url, function(error, response, html){
		if(!error)
	        var $ = cheerio.load(html);
	  //the [1] will get the second classes begin date
	   var row = $($("span:contains('Classes Begin')")[1]).parent().parent();
	   var datebox = $(row).find('td')[1];
	   var date = $(datebox).text();
	    console.log('Classes Begin', date);
	   
	   // $("span:contains('Classes End')");
	   var row2 = $($("span:contains('Classes End')")[1]).parent().parent();  
	   var datebox = $(row2).find('td')[1];
	   var date2 = $(datebox).text();
	   console.log('Classes End', date2);
	    })
	}
		else if (year == 2015 && semester == 'fall'){
			url='http://registrar.unc.edu/academic-calendar/academic-calendars-2015-2016-2016-2017/'

			request(url, function(error, response, html){
			if(!error)
		        var $ = cheerio.load(html);
		   $("span:contains('Classes Begin')");
		   var row = $($("span:contains('Classes Begin')")[0]).parent().parent();
		   var datebox = $(row).find('td')[1];
		   var date = $(datebox).text();
		   console.log('Classes Begin', date);
		    
		    $("span:contains('Classes End')");
		   var row2 = $($("span:contains('Classes End')")[0]).parent().parent();  
		   var datebox = $(row2).find('td')[1];
		   var date2 = $(datebox).text();
		   console.log('Classes End', date2);
	    })
		}
				else if (year == 2016 && semester == 'spring'){
					url='http://registrar.unc.edu/academic-calendar/academic-calendars-2015-2016-and-2016-2017/'
						request(url, function(error, response, html){

							if(!error)
						        var $ = cheerio.load(html);
						   $("span:contains('Classes Begin')");
						   var row = $($("span:contains('Classes Begin')")[1]).parent().parent();
						   var datebox = $(row).find('td')[1];
						   var date = $(datebox).text();
						    console.log('Classes Begin', date);
						    
						    $("span:contains('Classes End')");
							   var row2 = $($("span:contains('Classes End')")[1]).parent().parent();  
							   var datebox = $(row2).find('td')[1];
							   var date2 = $(datebox).text();
							   console.log('Classes End', date2);
							    })
					}
				else if (year == 2016 && semester == 'fall'){
					url='http://registrar.unc.edu/academic-calendar/academic-calendars-2015-2016-and-2016-2017/'
						request(url, function(error, response, html){

							if(!error)
						        var $ = cheerio.load(html);
						   $("span:contains('Classes Begin')");
						   var row = $($("span:contains('Classes Begin')")[0]).parent().parent();
						   var datebox = $(row).find('td')[2];
						   var date = $(datebox).text();
						    console.log('Classes Begin', date);
						    $("span:contains('Classes End')");
							   var row2 = $($("span:contains('Classes End')")[0]).parent().parent();  
							   var datebox = $(row2).find('td')[2];
							   var date2 = $(datebox).text();
							   console.log('Classes End', date2);
							    })
					}
						else if (year == 2017 && semester == 'spring'){
						url='http://registrar.unc.edu/academic-calendar/academic-calendars-2015-2016-and-2016-2017/'
						request(url, function(error, response, html){

							if(!error)
						        var $ = cheerio.load(html);
						   $("span:contains('Classes Begin')");
						   var row = $($("span:contains('Classes Begin')")[1]).parent().parent();
						   var datebox = $(row).find('td')[2];
						   var date = $(datebox).text();
						   console.log('Classes Begin', date);
						    $("span:contains('Classes End')");
							   var row2 = $($("span:contains('Classes End')")[1]).parent().parent();  
							   var datebox = $(row2).find('td')[2];
							   var date2 = $(datebox).text();
							   console.log('Classes End', date2);
							    })
					}
}
//to test for different years and semester, change the year and semester here
retreiveData(2014,'fall');



