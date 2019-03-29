/* Toggle to visible or hidden board with settings */
$(".js-settings").on("click", function () {
	$(".board").toggle(".visible-brd");
});

$(".js-close").on("click", function() {
	$(".board").toggle(".visible-brd");
});

$(document).ready(function() {
	$(".js-small").on("click", function(e) {
		e.preventDefault();
		makeGrid(35,35);
	});

	$(".js-medium").on("click", function(e) {
		e.preventDefault();
		makeGrid(45,55);
	});

	$(".js-large").on("click", function(e) {
		e.preventDefault();
		makeGrid(50,75);
	});

	$("#sizePicker").on("submit", function(e) {
		e.preventDefault();
		var height = $("#inputHeight").val();
		var width = $("#inputWidth").val();
		makeGrid(height, width);
	});
});

/* Toggle to visible or hidden custom grid size */
$(".js-custom").on("click", function() {
	$("form").toggle();
});

/* Generation pixel canvas */
function makeGrid (height, width) {    
	$("#pixelCanvas").html("");
	
	for (var h = 0; h < height; h++) {  
		$("#pixelCanvas").append("<tr></tr>");
	}

	$("tr").each(function() {
		for(var w = 0; w < width; w++) {
		$(this).append("<td></td>");
		}
	});
}

/* Click and move to add color to multiple cells */
$("#pixelCanvas").on("mousedown", "td", function(event) {
	
	if (event.buttons === 1) {    
		var colorCell = $("#colorPicker").val();

		$(event.target).css("background-color", "#" + colorCell); 

		$("#pixelCanvas").on("mouseenter", "td", function(e) { 
			$(e.target).css("background-color", "#" + colorCell);
		});  

		$("#pixelCanvas").on("mouseup mouseleave", function(e) {
			e.preventDefault(); 
			$("#pixelCanvas").off("mouseenter");
			return false;
		});
	}
});

/* Reset button */
$(".js-reset").on("click", function (e) {
	e.preventDefault();
	$("td").css("background-color", "#fff");
});

/* Toggle grid button */
$(".js-toggle-grid").on("click", function (e) {
	e.preventDefault();
	$("tr, td").toggleClass("toggle-border");
});

/* Function to save table canvas as .PNG file */
$(".js-save").click(function() {
	html2canvas($("#pixelCanvas").get(0), {
		onrendered: function (canvas) {
			var a = document.createElement("a");
			a.href = canvas.toDataURL("image/png");
			a.download = "MyPixelArt.png";
			a.click();
		}
	});
});