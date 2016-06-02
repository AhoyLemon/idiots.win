// jshint -W117

function shuffle(o) {
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function type() {
  captionEl.html(myQuery.substr(0, captionLength++));
  if(captionLength < myQuery.length+1) {
    setTimeout('type()', 101);
  } else {
    pullResults();
  }
}

function erase() {
  captionEl.html(myQuery.substr(0, captionLength--));
  if(captionLength >= 0) {
    setTimeout('erase()', 101);
  } else {
    captionLength = 0;
    newRound();
  }	
}

function pullResults() {
  $.getJSON("http://suggestqueries.google.com/complete/search?callback=?", { 
    "hl":"en", // Language                  
    "jsonp":"suggestCallBack", // jsonp callback function name
    "q":myQuery, // query term
    "client":"youtube" // force youtube style response, i.e. jsonp
  });
  suggestCallBack = function (data) {
    $.each(data[1], function(key,value) {
      answers.push([data[1][key][0], key]);
    });
    answers.length = 5;
    shuffle(answers);
    console.log(answers);
    $.each(answers, function(key,value) {
      var res = answers[key][0].split(myQuery);
      $('#Results').append('<li data-place="'+answers[key][1]+'"><b>'+myQuery+'</b>'+res[1]+'</li>');
    });
  };
}

function correctAnswer() {
  if (round.guesses == 1) {
    player.perfect++;
    $('#PerfectBox').removeClass('zero');
    $('#NumberPerfect').text(player.perfect);
    player.score = player.score + 4;
  } else if (round.guesses == 2) {
    player.great++;
    $('#NumberGreat').text(player.great);
    $('#GreatBox').removeClass('zero');
    player.score = player.score + 3;
  } else if (round.guesses == 3) {
    player.okay++;
    $('#NumberOkay').text(player.okay);
    $('#OkayBox').removeClass('zero');
    player.score = player.score + 2;
  } else if (round.guesses == 4) {
    player.bad++;
    $('#NumberBad').text(player.bad);
    $('#BadBox').removeClass('zero');
    player.score = player.score + 1;
  } else if (round.guesses == 5) {
    player.failure++;
    $('#NumberFailure').text(player.failure);
    $('#FailureBox').removeClass('zero');
  }
  //$('#NumberScore').text(player.score);
  $('#ScoreBox').removeClass('zero');
  var guessReadout;
  if (round.guesses == 1) {
    guessReadout = "first try";
  } else {
    guessReadout = round.guesses + ' tries';
  }
  sendGA('round complete', guessReadout, round.guesses);
  round.guesses = 0;
}

function newRound(customQuery) {
  answers = [];
  if (customQuery) {
    myQuery = customQuery;
  } else {
    r = Math.floor((Math.random() * rounds.length));
    myQuery = rounds[r].query;
  }
  //$('#Search').val(myQuery);
  $('#Results').empty();
  //$('.fake-input').text(myQuery);
  type();
}