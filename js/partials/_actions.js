// jshint -W117

$(document).ready(function() {
  roundCount = rounds.length + 1;
  $('#RoundCount').text(roundCount);
  if (window.location.search) {
    const searchParams = new URLSearchParams(window.location.search);
    const query = (searchParams.get('q') || searchParams.get('query') || searchParams.get('search') );
    setTimeout(function(){ 
      newRound(query);
    }, 300);
  } else {
    reRoll = 0;
    newRound();
  }
  
  var ua = navigator.userAgent.toLowerCase();
  //console.log(ua);
  device = "";
  browser = "";
  
  if (ua.indexOf("android") > -1) {
    device = "android";
    if (ua.indexOf("firefox") > -1) {
      // Android Firefox
      browser="firefox";
    } else if (ua.indexOf("opr") > -1) {
      // Android Opera
      browser="opera";
    } else if (ua.indexOf("chrome") > -1) {
      // Android Chrome
      browser="chrome";
    }
  } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) {
    device = "ios";
  } else if (ua.indexOf('windows') > -1) {
    device = "windows";
    if (ua.indexOf("edge") > -1) {
      browser = "edge";
    } else if (ua.indexOf("trident") > -1) {
      browser = "ie";
    } else if (ua.indexOf('firefox') > -1) {
      browser = "firefox";
    } else if (ua.indexOf('opr') > -1) {
      browser = "opera";
    } else if (ua.indexOf('chrome') > -1) {
      browser = "chrome";
    }
  } else if (ua.indexOf('firefox') > -1) {
    browser = "firefox";
  } else if (ua.indexOf('chrome') > -1) {
    device = "unknown";
    browser = "chrome";
  }
  //console.log('device: '+device+'. browser:'+browser);
  addToHomeScreen(device,browser);
  
  grabPlayerScores();
  
});

$('#Banner a.close').click(function() {
  $('#Banner').removeClass('visible');
  sendEvent('Lemon Banner', 'banner closed', 'by Lemon banner closed');
});

$('#Results').on('click', 'li', function() {
  //alert('WRONG ANSWER\n'+$(this).text()+'\n'+( parseInt($(this).attr('data-place')) + 1));
  if ($(this).hasClass('correct-answer') || $(this).hasClass('wrong-answer')) {
    // do nothing (you already guessed this.)
  } else {
    round.guesses++;
    if ($(this).attr('data-place') == "0") {
      $(this).addClass('correct-answer');
      $(this).siblings().addClass('wrong-answer');
      correctAnswer();
      setTimeout(function(){ 
        erase();
      }, 300);

      if (round.guesses < 2) {
        sendEvent('CORRECT answer', $(this).text(), 'first try');
      } else {
        sendEvent('CORRECT answer', $(this).text(), round.guesses+' tries');
      }

    } else {
      $(this).addClass('wrong-answer');

      sendEvent('CORRECT answer', $(this).text(), '#'+ (parseInt($(this).attr('data-place')) + 1));
    }
  }
});

$('button.hamburger').click(function() {
  $(this).toggleClass('is-active');
  $('.sidebar').toggleClass('visible');

  if ($('.sidebar').hasClass('visible')) {
    sendEvent('SIDEBAR toggle', 'show');
  } else {
    sendEvent('SIDEBAR toggle', 'hide');
  }
  
});

$('#HomescreenLink').click(function() {
  $('#HomescreenHolder').show();
});

$('#CloseHomeScreenHelp').click(function() {
  $('#HomescreenHolder').hide();
});