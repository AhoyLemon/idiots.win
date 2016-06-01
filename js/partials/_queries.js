// jshint -W117

var rounds = [
  {
    query: "color of women's",
    right: "color of women's discharge",
    wrong: [
      "color of women's suffrage movement",
      "color of women's day",
      "color of women's nipples"
    ]
  },
  {
    query: "why do",
    right: "why do we yawn",
    wrong: [
      "why do men cheat",
      "why do men have nipples",
      "why do people snore"
    ]
  },
  {
    query: "why is my",
    right: "why is my poop green",
    wrong: [
      "why is my period late",
      "why is my dog shaking",
      "why is my eye twitching",
      "why is my poop black",
      "why is my poop red"
    ]
  },
  {
    query: "why is dona",
    right: "why is donald trump orange",
    wrong: [
      "why is my period late",
      "why is donald trump good",
      "why is my eye twitching",
      "why is my poop black",
      "why is my poop red"
    ]
  },
];

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function newRound(z) {
  var answers = [];
  var r = z;
  var correct = rounds[r].right;
  var myQuery = rounds[r].query;
  //$('#Search').val(myQuery);
  answers.push(rounds[r].right);
  $.each(rounds[r].wrong, function(key,value) {
    answers.push(rounds[r].wrong[key]);
  });
  shuffle(answers);
  console.log(answers);
  $('#Results').empty();
  if (r == 1) {
    $(".fake-input").typeIt({
      speed: 190,
      callback: function() {
        setTimeout(function(){ 
          $.each(answers, function(key,value) {
            var res = value.split(myQuery);
            if (value == correct) {
              $('#Results').append('<li class="correct"><b>'+myQuery+'</b>'+res[1]+'</li>');
            } else {
              $('#Results').append('<li><b>'+myQuery+'</b>'+res[1]+'</li>');
            }
          });
        }, 320);
      }
    }).tiType(myQuery);
  } else {
    $(".fake-input").typeIt().tiType('FUCK YOU.');
  }
  
}

$(document).ready(function() {
  newRound(1);
});

$('#Results').on('click', 'li', function() {
  if ($(this).hasClass('correct')) {
    newRound(2);
  } else {
    $(this).addClass('wrong-answer');
  }
});

var d = new Date('6/1/2016 0:42:08');
console.log(d);

// USE THIS URL....
// http://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=why%20do