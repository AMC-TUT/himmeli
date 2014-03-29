// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require_tree .

$('span[rel=tooltip]').tooltip({
  placement: "top"
});

if (_.isNull(Himmeli)) Himmeli = {};
var controller = $('html').attr('class').split(' ').pop();

if (controller == 'people') {
  $.get('/people/' + Himmeli.id + '.json').then(function(data) {
    Himmeli['scoresPerEvent'] = data.scoresPerEvent;
    Himmeli['medianReplyTimes'] = data.medianReplyTimes;
  });

  $('.scores-chart-pills a').on('click', function(e) {
    e.preventDefault();

    var $tgt = $(e.target);
    $tgt.parent('li').addClass('active').siblings().removeClass('active');
    Himmeli.scoresPerEventChart($tgt.data('level'));
    Himmeli.medianReplyTimesChart($tgt.data('level'));
  });

  setTimeout(function() {
    Himmeli.scoresPerEventChart();
    Himmeli.medianReplyTimesChart();
  }, 500);
}

if (controller == 'game') {
  //
}

// Helper functions
Himmeli.scoresPerEventChart = function(level) {
  var lvl = level || 1,
    events = Himmeli.scoresPerEvent[lvl - 1],
    data = _.pluck(events, 'scores'),
    labels = [];

  _.each(events, function(e, index) {
    labels.push(e.aborted ? 'A' : index + 1);
  });

  var lineChartData = {
    labels: labels,
    datasets: [{
      fillColor: "rgba(151,187,205,0.5)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      data: data
    }]
  };

  var chartLine = new Chart(document.getElementById("scoresPerEventChart").getContext("2d")).Bar(lineChartData);
};

Himmeli.medianReplyTimesChart = function(level) {
  var lvl = level || 1,
    data = Himmeli.medianReplyTimes[lvl - 1],
    labels = [];

  _.each(data, function(e, index) {
    labels.push(index + 1);
  });

  var lineChartData = {
    labels: labels,
    datasets: [{
      fillColor: "rgba(151,187,205,0.5)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      data: data
    }]
  };

  var chartLine = new Chart(document.getElementById("medianReplyTimesChart").getContext("2d")).Line(lineChartData);
};

Himmeli.addEvent = function(gameEvent) {
  // token
  var token = $('input[name=authenticity_token]').val();

  // request object
  var json = {
    'utf8': '✓',
    'authenticity_token': token,
    'event': gameEvent
  };

  // request
  return $.ajax({
    dataType: 'json',
    method: 'post',
    url: '/events',
    data: json
  });
};

Himmeli.updatePersonLevel = function(level) {
  // token
  var token = $('input[name=authenticity_token]').val();

  // request object
  var json = {
    'utf8': '✓',
    'authenticity_token': token,
    'person': {
      'level': level
    }
  };

  // request
  return $.ajax({
    dataType: 'json',
    method: 'put',
    url: '/people/' + Himmeli.id,
    data: json
  });
};

Himmeli.getVersions = function() {
  return $.getJSON('/versions.json');
};

/*
var gameEvent = {
  'person_id': 2,
  'version_id': 1,
  'duration': 1098,
  'level': 4,
  'scores': 3,
  'aborted': 1,
  'items_attributes': [{
    'duration': 23939,
    'answer': 1,
    'pointer': 1,
    'target': 1
  }, {
    'duration': 23939,
    'answer': 1,
    'pointer': 1,
    'target': 1
  },{
    'duration': 23939,
    'answer': 1,
    'pointer': 1,
    'target': 1
  }, {
    'duration': 23939,
    'answer': 1,
    'pointer': 1,
    'target': 1
  }]
};
console.log(Himmeli.addEvent(gameEvent));
*/