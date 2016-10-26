$(document).ready(function(){
  $('#keys .digit').click(function(){
    //console.log($(this).html() +  "Clicked");
    $("#preview").html($("#preview").html() + this.dataset.digit);
  });

  $("#delete").click(function(){
    $("#preview").html($("#preview").html().slice(0,-1));
});
});
