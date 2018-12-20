$('.time').each(function() 
{
	rawTime = $(this).text().replace(/\s/g, '');
	rawTimes = rawTime.split('-');
	start = formatDate(rawTimes[0]);
	end = formatDate(rawTimes[1]);
	$(this).text(start + " - " + end);
});
function formatDate(time) 
{
	times = time.split(':');
	var hours = times[0];
	var minutes = times[1];
	var seconds = times[2];
	var postfix = "AM";
	
	var hour = hours;

	if (hour > 12) 
	{
		hour = hours - 12;
		postfix = "PM";
	}
	else if (hour > 0 && hour <= 9)
	{
		hour = hours.substring(1,2);
	}
	else if (hour > 9 && hour <= 11)
	{
		hour = hours;
	}
	else if (hour == 0) hour = 12;
	else if (hour == 12) postfix = "PM";

	var replace = hour + ":" + minutes;

	replace += " " + postfix;
	return replace;
}