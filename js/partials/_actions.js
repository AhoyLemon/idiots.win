// jshint -W117

$(document).ready(function() {
  roundCount = rounds.length + 1;
  $('#RoundCount').text(roundCount);
  if (window.location.search && !window.location.search.includes('=')) {
    var q = window.location.search.substring(1);
    var qd = decodeURIComponent(q);
    setTimeout(function(){ 
      newRound(qd);
    }, 300);
  } else {
    reRoll = 0;
    newRound();
  }
  
  var ua = navigator.userAgent.toLowerCase();
  console.log(ua);
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
  console.log('device: '+device+'. browser:'+browser);
  addToHomeScreen(device,browser);
  
  grabPlayerScores();
  
  setTimeout(function(){ 
    new Audio('audio/bylemon.mp3').play();
    setTimeout(function(){ 
      //self.bannerVisible = true;
      $('#Banner').addClass('visible');
    }, 800);
    
    
    //$('#Banner').addClass('visible');
  }, 14000);
  
});

$('#Banner a.close').click(function() {
  $('#Banner').removeClass('visible');
});

$('#Results').on('click', 'li', function() {
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
    } else {
      $(this).addClass('wrong-answer');
    }
  }
});

$('button.hamburger').click(function() {
  $(this).toggleClass('is-active');
  $('.sidebar').toggleClass('visible');
});

$('#HomescreenLink').click(function() {
  $('#HomescreenHolder').show();
});

$('#CloseHomeScreenHelp').click(function() {
  $('#HomescreenHolder').hide();
});