// jshint -W117

$(document).ready(function() {
  newRound();
});

$('#Results').on('click', 'li', function() {
  if ($(this).attr('data-place') == "0") {
    newRound();
  } else {
    $(this).addClass('wrong-answer');
  }
});