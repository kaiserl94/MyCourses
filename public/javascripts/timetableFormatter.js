$('.timetable-card').each(function(index, card) 
{
	var time = $(card).find($(".time")).text().replace(/\s/g, '');
	var times = time.split("-");
	var start = times[0];
	var end = times[1];
	var duration;

	if (start.length == 6)
	{
		if (end.length == 6)
		{
			duration = end.substring(0,1) - start.substring(0,1);
		}
		else
		{
			duration = end.substring(0,2) - start.substring(0,1);
		}
	}
	else
	{
		if (end.length == 6)
		{
			duration = end.substring(0,1) - start.substring(0,2);
		}
		else
		{
			duration = end.substring(0,2) - start.substring(0,2);
		}
	}

	if (duration == 2) 
	{
		$(card).addClass("three-hour");
	}

	if (start == "8:30AM")
	{
		$(card).addClass("eight-thirty");
	}
	else if (start == "10:00AM")
	{
		$(card).addClass("ten-am");
	}
	else if (start == "11:30AM")
	{
		$(card).addClass("eleven-thirty");
	} 
	else if (start == "1:00PM")
	{
		$(card).addClass("one-pm");
	} 
	else if (start == "2:30PM")
	{
		$(card).addClass("two-thirty");
	}	
	else if (start == "4:00PM")
	{
		$(card).addClass("four-pm");
	} 
	else if (start == "5:30PM")
	{
		$(card).addClass("five-thirty");
	}
	else if (start == "7:00PM")
	{
		$(card).addClass("seven-pm");
	}
	else if (start == "8:30PM")
	{
		$(card).addClass("eight-thirty-pm");
	}
});