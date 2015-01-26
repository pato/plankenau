$(document).ready(function(){
    var last = new Date(document.lastModified);
    var format = last.getFullYear() + "/" + (last.getMonth()+1) + "/" + last.getDate();
    $("#lastModified").text("Last modified: "+format);
});

var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
$(document).keydown(function(e) {
  kkeys.push( e.keyCode );
  if ( kkeys.toString().indexOf( konami ) >= 0 ) {
    $(document).unbind('keydown',arguments.callee);
    // do something funny
    alert("You win.");
  }
});
