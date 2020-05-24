// jshint -W117
// jshint -W098

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
  /*
  fetch('https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=why%20do').then(function(response) {
    response.json().then(function(parsedJson) {
      console.log('This is the parsed json', parsedJson);
    });
  });
  */

  $.getJSON("https://suggestqueries.google.com/complete/search?callback=?", { 
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
    answers.shift();
    shuffle(answers);
    if (answers.length > 4) {
      answers.length = 4;
    }
    answers.push([correctAnswer, 0]);
    shuffle(answers);
    //console.log(answers);
    $('#Results').empty();
    $.each(answers, function(key,value) {
      var res = answers[key][0].split(myQuery);
      if (res[1]) {
        $('#Results').append('<li data-place="'+answers[key][1]+'"><b>'+myQuery+'</b>'+res[1]+'</li>');
      } else {
        $('#Results').append('<li data-place="'+answers[key][1]+'">'+answers[key][0]+'</li>');
      }
    });
  };

}

function grabPlayerScores() {
  if(typeof(Storage) !== "undefined") {

    if (localStorage.playerPlayed === undefined || localStorage.playerPlayed === null) {
      localStorage.setItem('playerPlayed','');
    } else {
      if (localStorage.playerPlayed) {
        player.played = localStorage.playerPlayed.split(',');
        if (player.played[0] === "") {
          player.played.splice(0,1);
        }
        var uniqueNames = [];
        $.each(player.played, function(i, el){
          if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });
        player.played = uniqueNames;
      }
      if (localStorage.playerRounds > 0) {
        player.rounds = parseInt(localStorage.playerRounds);
      }
      if (localStorage.playerScore > 0) {
        player.score = parseInt(localStorage.playerScore);
      }
      if (localStorage.playerPerfect > 0) {
        player.perfect = parseInt(localStorage.playerPerfect);
        $('#NumberPerfect').text(player.perfect);
        $('#PerfectBox').removeClass('zero');
      }
      if (localStorage.playerGreat > 0) {
        player.great = parseInt(localStorage.playerGreat);
        $('#NumberGreat').text(player.great);
        $('#GreatBox').removeClass('zero');
      }
      if (localStorage.playerOkay > 0) {
        player.okay = parseInt(localStorage.playerOkay);
        $('#NumberOkay').text(player.okay);
        $('#OkayBox').removeClass('zero');
      }
      if (localStorage.playerBad > 0) {
        player.bad = parseInt(localStorage.playerBad);
        $('#NumberBad').text(player.bad);
        $('#BadBox').removeClass('zero');
      }
      if (localStorage.playerFailure > 0) {
        player.failure = parseInt(localStorage.playerFailure);
        $('#NumberFailure').text(player.failure);
        $('#FailureBox').removeClass('zero');
      }
    }
  } else {
    // Sorry! No Web Storage support..
  }
}

function correctAnswer() {
  if (round.guesses == 1) {
    player.perfect++;
    $('#PerfectBox').removeClass('zero');
    $('#NumberPerfect').text(player.perfect);
    player.score = player.score + 4;
    localStorage.playerPerfect = player.perfect;
  } else if (round.guesses == 2) {
    player.great++;
    $('#NumberGreat').text(player.great);
    $('#GreatBox').removeClass('zero');
    player.score = player.score + 3;
    localStorage.playerGreat = player.great;
  } else if (round.guesses == 3) {
    player.okay++;
    $('#NumberOkay').text(player.okay);
    $('#OkayBox').removeClass('zero');
    player.score = player.score + 2;
    localStorage.playerOkay = player.okay;
  } else if (round.guesses == 4) {
    player.bad++;
    $('#NumberBad').text(player.bad);
    $('#BadBox').removeClass('zero');
    player.score = player.score + 1;
    localStorage.playerBad = player.bad;
  } else if (round.guesses == 5) {
    player.failure++;
    $('#NumberFailure').text(player.failure);
    $('#FailureBox').removeClass('zero');
    localStorage.playerFailure = player.failure;
  }
  player.rounds++;
  localStorage.playerScore = player.score;
  localStorage.playerRounds = player.rounds;
  $('#ScoreBox').removeClass('zero');
  player.played.push(myQuery);
  localStorage.playerPlayed = player.played.toString();
  var guessReadout;
  if (round.guesses == 1) {
    guessReadout = "first try";
  } else {
    guessReadout = round.guesses + ' tries';
  }
  sendEvent('round complete', guessReadout, round.guesses);
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
        gameOver();
      }
    } else {
      myQuery = rounds[r].query;
      player.played.push(myQuery);
    }
  }
  $('#Results').empty();
  type();
  //console.log(player);
  player.roundsThisSession++;
  if (player.roundsThisSession == 3) {
    //new Audio('audio/bylemon.mp3').play();

    
    setTimeout(function(){ 
      //self.bannerVisible = true;
      $('#Banner').addClass('visible');
    }, 800);
    
  }
}

function inIframe () {
  try {
      return window.self !== window.top;
  } catch (e) {
      return true;
  }
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

function gameOver(n) {
  $('#GameOverRoundsPlayed').text(player.rounds);
  var bestPossibleScore = (player.rounds * 4);
  var scorePercent = parseInt((player.score / bestPossibleScore) * 100);
  if (n) {
    scorePercent = n;
  }
  var finalRating = "";
  var scoreEmoji = "";
  $('#GameOverScore').text(scorePercent).append('<sup class="pct">%</sup>');
  if (scorePercent < 20) {
    finalRating = "failure";
    scoreEmoji = "";
  } else if (scorePercent < 40) {
    finalRating = "bad";
  } else if (scorePercent < 60) {
    finalRating = "okay";
  } else if (scorePercent < 80) {
    finalRating = "great";
  } else if (scorePercent < 101) {
    finalRating = "perfect";
  }
  if (scorePercent < 10) {
    scoreEmoji = "👵";
  } else if (scorePercent < 20) {
    scoreEmoji = "💩";
  } else if (scorePercent < 30) {
    scoreEmoji = "👾";
  } else if (scorePercent < 40) {
    scoreEmoji = "👺";
  } else if (scorePercent < 50) {
    scoreEmoji = "🙈";
  } else if (scorePercent < 60) {
    scoreEmoji = "😵";
  } else if (scorePercent < 70) {
    scoreEmoji = "🐅";
  } else if (scorePercent < 80) {
    scoreEmoji = "😻";
  } else if (scorePercent < 90) {
    scoreEmoji = "🍻";
  } else if (scorePercent < 101) {
    scoreEmoji = "💎";
  } else {
    scoreEmoji = "🐛";
  }
  $('#GameOverRating').html(scoreEmoji).removeClass('failure bad okay great perfect').addClass(finalRating);
  $('#GameOver').fadeIn();
  
  localStorage.removeItem("playerRounds");
  localStorage.removeItem("playerScore");
  localStorage.removeItem("playerPlayed");
  
  localStorage.removeItem("playerPerfect");
  localStorage.removeItem("playerGreat");
  localStorage.removeItem("playerOkay");
  localStorage.removeItem("playerBad");
  localStorage.removeItem("playerFailure");
}