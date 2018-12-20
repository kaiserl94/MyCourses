var average = $("#avg").text();
average = average.substring(0, average.length-1);

if (average < 50)
{
	$("#avg").addClass("bad");
	$(".standing").text("Bad Standing");
	$(".standing").addClass("bad");
}
else if (average < 75)
{
	$("#avg").addClass("okay");
	$(".standing").text("Okay Standing");
	$(".standing").addClass("okay");

}
else if (average < 90)
{
	$("#avg").addClass("good");
	$(".standing").text("Good Standing");
	$(".standing").addClass("good");
}
else
{
	$("#avg").addClass("great");
	$(".standing").text("Great Standing");
	$(".standing").addClass("great");
}