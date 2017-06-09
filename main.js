var months = ['January', 'February', 'March', 'April', 'May', 'June' ,'Jully', 'August', 'September', 'October', 'November', 'December'];
var weekdayold = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
var weekday = [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ];
var cellWidth = 30;

var nextDay = function(d) {
	return new Date(d.getTime() + 3600000 * 24);
}

var createCalendarMonth = function(d) {
	var yyyy = d.getFullYear();
	var mm = d.getMonth()
	d = new Date(yyyy, mm, 1, 0, 0, 0, 0);
	var monthDays = [];
	while(d.getMonth() == mm) {
		monthDays.push(d);
		d = nextDay(d);
	}
	var table = $('<table></table>', {'class': 'calmonth'});
	table.css('width', (monthDays.length * cellWidth) + 'px');
	
	/* month */
	var row = $('<tr></tr>', {'class': 'calrow'});
	var cell = $('<td></td>', {'class': 'monthlabel', 'colspan' : monthDays.length});
	if ( mm % 2 == 0 ) {
		cell.addClass('evenmonth');
	} else {
		cell.addClass('oddmonth');
	}
	cell.append(months[mm] + ' ' + yyyy
				+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
				+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
				+ months[mm] + ' ' + yyyy);
	row.append(cell)
	table.append(row);
	
	/* day of week */
	var row = $('<tr></tr>', {'class': 'calrow'});
	for (i in monthDays) {
		var day = monthDays[i];
		var cell = $('<td></td>', {'class': 'calcell daylabel'});
		cell.css('width',cellWidth);
		styleToday(day, cell);
		styleWeekend(day, cell);
		cell.append(weekday[day.getDay()]);
		row.append(cell);
	}
	table.append(row);
	
	/* day of month */
	var row = $('<tr></tr>', {'class': 'calrow'});
	for (i in monthDays) {
		var day = monthDays[i];
		var cell = $('<td></td>', {'class': 'calcell  daylabel'});
		cell.css('width',cellWidth);
		styleToday(day, cell);
		styleWeekend(day, cell);
		cell.append(day.getDate());
		row.append(cell);
	}
	table.append(row);
	
	/* data */
	for (var n=0;n<25;n++) {
		var row = $('<tr></tr>', {'class': 'calrow'});
		for (var i in monthDays) {
			var day = monthDays[i];
			var cell = $('<td></td>', {'class': 'calcell'});
			cell.css('width',cellWidth);
			styleWeekend(day, cell);
			row.append(cell);
		}
		table.append(row);
	}
	
	return table;
}

var styleWeekend = function(day, elem) {
	if( day.getDay() == 0 || day.getDay() == 6 ){
		elem.addClass('weekend');
	}
}

var styleToday = function(day, elem) {
	var today = new Date();
	if( today.getFullYear() == day.getFullYear() &&
		today.getMonth() == day.getMonth() &&
		today.getDate() == day.getDate() ) {
		elem.addClass('today');
	}
}

var nextMonth = function(day) {
	if(day.getMonth() == 11) {
		return new Date(day.getFullYear() + 1, 0, day.getDate());
	}
	return new Date(day.getFullYear(), day.getMonth() + 1, day.getDate());
}

var previousMonth = function(day) {
	if(day.getMonth() == 0) {
		return new Date(day.getFullYear() - 1, 11, day.getDate());
	}
	return new Date(day.getFullYear(), day.getMonth() - 1, day.getDate());
}

var addOne = function() {
	var cal = $('div#calendar');
	var org = cal.width();
	var row = $('tr#therow');
	var cell = $('<td></td>');
	cell.append(createCalendarMonth(new Date(2010, 11, 1)));
	row.prepend(cell);	
	var o = cal.offset();
	o.left -= cal.width() - org;
	cal.offset(o);
}

var createCalendar = function() {
	var d = new Date();
	d = previousMonth(d);
	
	var table = $('<table></table>');
	var row = $('<tr id="therow"></tr>');
	
	for(var i=0;i<4;i++) {
		var cell = $('<td></td>');
		cell.append(createCalendarMonth(d));
		row.append(cell);
		d = nextMonth(d);
	}
	table.append(row);
	return table;
}

var todayLeft = 0;

$(function() {
	var cal = $('div#calendar');
	$('div#leftbox').click(function(event) {
		$('div#mouse').html('left');
		cal.animate({"left": "+=350px"}, 1000);
	});
	$('div#rightbox').click(function(event) {
		$('div#mouse').html('right');
		cal.animate({"left": "-=350px"}, 1000);
	});
	
	cal.append(createCalendar(new Date()));
	todayLeft = 200 - $('td.today').position().left;
	cal.css('left', todayLeft); 
	
	$('div#centerbox').click(function(event) {
		cal.animate({'left': todayLeft}, 2000);
	});
	
	$('div.mbox').mouseenter(function(event) {
		$(this).animate({opacity: 1}, 500)
	});
	$('div.mbox').mouseleave(function(event) {
		$(this).animate({opacity: 0.25}, 500)
	});
 });
