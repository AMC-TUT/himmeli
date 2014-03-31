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

if ($('html').hasClass('himmeli')) {
  $('span[rel=tooltip]').tooltip({
    placement: "top"
  });
}

if (_.isNull(Himmeli)) Himmeli = {};
var controller = $('html').attr('class').split(' ').pop();

if (controller == 'people' && $('.person-details').length) {
  $.get('/people/' + Himmeli.id + '.json').then(function(data) {
    Himmeli['scoresPerEvent'] = data.scoresPerEvent;
    Himmeli['medianReplyTimes'] = data.medianReplyTimes;
    Himmeli['levelHighscores'] = data.levelHighscores;
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


Himmeli.statsView = function() {
  var $body = $('body');

  var stats = '<div class="stats">' +
    '<a href="#" class="btn btn-primary close-btn">Palaa peliin</a>' +
    '<h1>Pelaajan kehittyminen</h1>' +
    '<p><strong>Nimi: ' + Himmeli.first_name + ' ' + Himmeli.last_name + '</strong></p>' +
    '<hr>' +
    '<ul class="nav nav-pills scores-chart-pills">' +
    '<li class="active"><a href="" data-level="1">Taso 1</a></li>' +
    '<li><a href="#" data-level="2">Taso 2</a></li>' +
    '<li><a href="#" data-level="3">Taso 3</a></li>' +
    '<li><a href="#" data-level="4">Taso 4</a></li>' +
    '<li><a href="#" data-level="5">Taso 5</a></li>' +
    '<li><a href="#" data-level="6">Taso 6</a></li>' +
    '</ul>' +
    '<hr>' +
    '<h3>Pisteitä per pelikerta</h3>' +
    '<canvas id="scoresPerEventChart" width="738" height="400"></canvas>' +
    '<h3>Keskimääräinen vastausaika (mediaani)</h3>' +
    '<canvas id="medianReplyTimesChart" width="738" height="400"></canvas>' +
    '</div>';

  $body.append(stats);

  $('.scores-chart-pills a').on('click', function(e) {
    e.preventDefault();

    var $tgt = $(e.target);
    $tgt.parent('li').addClass('active').siblings().removeClass('active');
    Himmeli.scoresPerEventChart($tgt.data('level'));
    Himmeli.medianReplyTimesChart($tgt.data('level'));
  });

  $('.close-btn').on('click', function(e) {
    e.preventDefault();

    $('.stats').fadeOut(700, function() {
      $('.close-btn').off('click');
      $('.scores-chart-pills a').off('click');
      $('.stats').remove();
    });
  });

  // update stats
  $.get('/people/' + Himmeli.id + '.json').then(function(data) {
    Himmeli['scoresPerEvent'] = data.scoresPerEvent;
    Himmeli['medianReplyTimes'] = data.medianReplyTimes;

    $('.stats').fadeIn(700, function() {
      setTimeout(function() {
        Himmeli.scoresPerEventChart();
        Himmeli.medianReplyTimesChart();
      }, 500);
    });
  });
};

$('body').on('click', '.help_button', function(e) {
  Himmeli.statsView();
});

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