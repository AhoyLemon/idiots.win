// jshint -W117

$(document).ready(function() {
  newRound();
  roundCount = rounds.length + 1;
  $('#RoundCount').text(roundCount);
});

$('#Results').on('click', 'li', function() {
  round.guesses++;
  if ($(this).attr('data-place') == "0") {
    $(this).addClass('correct-answer');
    $(this).siblings().addClass('wrong-answer');
    correctAnswer();
    setTimeout('erase()', 350);
  } else {
    $(this).addClass('wrong-answer');
  }
});

$('button.hamburger').click(function() {
  $(this).toggleClass('is-active');
  $('.sidebar').toggleClass('visible');
})