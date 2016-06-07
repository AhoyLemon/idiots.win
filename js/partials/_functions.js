// jshint -W117

function shuffle(o) {
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function type() {
  captionEl.html(myQuery.substr(0, captionLength++));
  if(captionLength < myQuery.length+1) {
    //setTimeout('type()', 101);
    setTimeout(function(){ 
      type();
    }, 101);
  } else {
    pullResults();
  }
}

function erase() {
  captionEl.html(myQuery.substr(0, captionLength--));
  if(captionLength >= 0) {
    //setTimeout('erase()', 101);
    setTimeout(function(){ 
      erase();
    }, 101);
  } else {
    captionLength = 0;
    reRoll = 0;
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
  answers = [];
  var correctAnswer = "";
  suggestCallBack = function (data) {
    var n = 0;
    $.each(data[1], function(key,value) {
      if (data[1][key][0] != myQuery) {
        if (n === 0) {
          correctAnswer = data[1][key][0];
        } else {
         answers.push([data[1][key][0], n]);
        }
        n++;
      }
    });
    shuffle(answers);
    if (answers.length > 4) {
      answers.length = 4;
    }
    answers.push([correctAnswer, 0]);
    shuffle(answers);
    console.log(answers);
    $('#Results').empty();
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
    if (player.played.indexOf(rounds[r].query) > -1) {
      reRoll++;
      if (reRoll < 8) {
        newRound();
      } else {
        alert("game over.\nYou've played all the rounds I've got. Check back, I'll add more soon.");
      }
    } else {
      myQuery = rounds[r].query;
      player.played.push(myQuery);
    }
  }
  $('#Results').empty();
  type();
  console.log(player);
}

function addToHomeScreen(device,browser) {
  if (device == "android") {
    $('#HomescreenLink').text('add to home screen');
    $('#HomescreenLink, #HomescreenHolder').addClass('android').addClass(browser);
  } else if (device == "ios") {
    $('#HomescreenLink').text('add to home screen');
    $('#HomescreenLink, #HomescreenHolder').addClass('ios safari');
  } else if (browser == "edge" || browser == "ie") {  
    $('#HomescreenLink').text('pin to start');
    $('#HomescreenLink, #HomescreenHolder').addClass('windows edge');
  } else if (browser == "opera") {
    $('#HomescreenLink').text('add to favorites');
    $('#HomescreenLink, #HomescreenHolder').addClass('windows opera');
  } else if (browser == "chrome") {
    $('#HomescreenLink').text('add to desktop');
    $('#HomescreenLink, #HomescreenHolder').addClass('desktop-chrome');
  } else if (browser == "firefox") {
    $('#AddToHomeScreen').html('<span class="label">bookmark idiots.win</span><span class="indent">Control+D</span>');
  } else {
    $('#AddToHomeScreen').remove();
  }
}