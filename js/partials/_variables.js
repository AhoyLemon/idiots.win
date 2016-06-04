// jshint -W117

var myQuery;
var captionEl = $('#FakeSearch');
var captionLength = 0;
var answers = [];
var roundCount;
var r;
var reRoll = 0;

var player = {
  rounds:0,
  played: [],
  score:0,
  perfect:0,
  great:0,
  okay:0,
  bad:0,
  failure:0
};

var round = {
  number:0,
  guesses:0
};