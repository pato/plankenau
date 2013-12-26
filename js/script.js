$(document).ready(function(){
    var last = document.lastModified;
    var format = last.getFullYear() + "/" + (last.getMonth()+1) + "/" + last.getDate();
    $("#lastModified").text(format);
});
