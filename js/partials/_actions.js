// jshint -W117

$(document).ready(function() {
  roundCount = rounds.length + 1;
  $('#RoundCount').text(roundCount);
  if (window.location.search) {
    var q = window.location.search.substring(1);
    var qd = decodeURIComponent(q);
    setTimeout(function(){ 
      newRound(qd);
    }, 300);
  } else {
    newRound();
  }  
});

$('#Results').on('click', 'li', function() {
  round.guesses++;
  if ($(this).attr('data-place') == "0") {
    $(this).addClass('correct-answer');
    $(this).siblings().addClass('wrong-answer');
    correctAnswer();
    setTimeout(function(){ 
      erase();
    }, 300);
  } else {
    $(this).addClass('wrong-answer');
  }
});

$('button.hamburger').click(function() {
  $(this).toggleClass('is-active');
  $('.sidebar').toggleClass('visible');
});