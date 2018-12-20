$('.timetable-card').each(function(index, card) 
{
	if ($(this).hasClass("Mon-Wed"))
	{
		var clonedCard = $(this).clone();
		clonedCard.addClass("Wed");
		clonedCard.removeClass("Mon-Wed");
		$("#timetable-cards").append(clonedCard);

		$(this).addClass("Mon");
		$(this).removeClass("Mon-Wed");
	}

	if ($(this).hasClass("Tue-Thu"))
	{
		var clonedCard = $(this).clone();
		clonedCard.addClass("Thu");
		clonedCard.removeClass("Tue-Thu");
		$("#timetable-cards").append(clonedCard);
		var id = $(".Thu").find($(".card-body h1")).attr("id") + "2";
		var h1 = $(".Thu").find($(".card-body h1"));
		h1.attr("id", id);

		$(this).addClass("Tue");
		$(this).removeClass("Tue-Thu");
	}
});