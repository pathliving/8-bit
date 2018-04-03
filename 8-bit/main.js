/* toggle to visible or hidden board with settings */
$(".settings").on("click", function () {
  $(".board").toggle(".visible-brd")
});

$(".close").on("click", function() {
  $(".board").toggle(".visible-brd")
});

/* toggle to visible or hidden custom grid size */
$(".custom").on("click", function() {
  $("form").toggle()
});


/* generation pixel canvas */
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


$(document).ready(function() {
  $(".small").on("click", function(e) {
  e.preventDefault();
  makeGrid(35,35);
});
  $(".medium").on("click", function(e) {
    e.preventDefault();
    makeGrid(55,55);
  });
  $(".large").on("click", function(e) {
    e.preventDefault();
    makeGrid(55,75);
  });
  $("#sizePicker").on("submit", function(e) {
    e.preventDefault();
    var height = $("#inputHeight").val();
    var width = $("#inputWidth").val();
    makeGrid(height, width);
  });
});

/* click and move to add color to multiple cells */
$("#pixelCanvas").on("mousedown", "td", function(event) {
   event.preventDefault();
   
  
  if (event.buttons === 1) {     
    
    var colorCell = $("#colorPicker").val();
    $(this).attr("bgcolor", colorCell);
    
     $(event.target).css('background-color', colorCell);       
     $("#pixelCanvas").on('mouseenter', 'td', function(evt){ 
        $(evt.target).css('background-color', colorCell); 
     });  
     $("#pixelCanvas").on('mouseup mouseleave', function(evt) {
        evt.preventDefault(); 
        $("#pixelCanvas").off('mouseenter');
        return false;
     });
}
});

/* reset button */
$(".reset").on("click", function (e){
  e.preventDefault();
  $("td").css("background-color", "#fff");
});

/* toggle grid button */
$(".toggle-grid").on("click", function (e){
  e.preventDefault();
  $("tr, td").toggleClass("toggle-border");
});

/* function for converting rgb() to hex color */
function searchRGB() {
  let i = colorPicked;
  let rgbValues = i.split("(")[1].split(")")[0].split(", ");
  return rgbValues;
}

function componentToHex(c) {
  var hex = Number(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

$('.pickColor').on('click', function(evt) {
  colorPicked = $(evt.target).css("background-color");
  $('#colorPicker').val(rgbToHex(searchRGB()[0], searchRGB()[1], searchRGB()[2]));
});