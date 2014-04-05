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

    $('.chart-pills').append(Himmeli.htmlPills());

    $('.chart-pills a').on('click', function(e) {
      e.preventDefault();

      var $tgt = $(e.target);

      if ($tgt.parent().hasClass('disabled')) return false; // disabled buttons

      $tgt.parent('li').addClass('active').siblings().removeClass('active');

      setTimeout(function() {
        Himmeli.scoresPerEventChart($tgt.data('level'));
        Himmeli.medianReplyTimesChart($tgt.data('level'));
      }, 500);
    });

  });

  setTimeout(function() {
    Himmeli.scoresPerEventChart();
    Himmeli.medianReplyTimesChart();
  }, 1000);
}

if (controller == 'game') {
  //
}

Himmeli.htmlPills = function() {
  var pills = '';

  _.each(Himmeli.scoresPerEvent, function(e, index) {
    var active = index === 0 ? 'active' : '',
      disabled = e.length < 2 ? 'disabled' : '',
      level = index + 1;

    pills += '<li class="' + active + ' ' + disabled + '"><a href="#" data-level="' + level + '">Level ' + level + '</a></li>';
  });

  $('.chart-pills').empty();

  return pills;
};

// Helper functions
Himmeli.scoresPerEventChart = function(level) {
  var lvl = level || 1,
    events = Himmeli.scoresPerEvent[lvl - 1],
    scores = _.pluck(events, 'scores');

  chartArray = [];
  chartArray.push(['Event', 'Game Over', 'Aborted', {
    role: 'style'
  }]);

  _.each(events, function(e, index) {
    var label = '',
      red = e.aborted ? e.scores : 0;
    blue = e.aborted ? 0 : e.scores;
    style = e.aborted ?
      'stroke-color: #D44950; stroke-opacity: 1; stroke-width: 1; fill-color: #D44950; fill-opacity: 0.5' : 'stroke-color: #97BBCD; stroke-opacity: 1; stroke-width: 1; fill-color: #97BBCD; fill-opacity: 0.5';

    var a = [label, blue, red, style];
    chartArray.push(a);
  });

  var data = google.visualization.arrayToDataTable(chartArray);

  var options = {
    width: 738,
    height: 400,
    legend: {
      position: 'none'
    },
    bar: {
      groupWidth: '75%'
    },
    isStacked: true,
    'chartArea': {
      'width': '90%',
      'height': '90%'
    }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('scoresPerEventChart'));
  chart.draw(data, options);
};

Himmeli.medianReplyTimesChart = function(level) {
  var lvl = level || 1,
    secs = Himmeli.medianReplyTimes[lvl - 1],
    labels = [];

  chartArray = [];
  chartArray.push(['Duration', 'Seconds']);

  _.each(secs, function(s, index) {
    var label = '',
      sec = s / 1000;

    var a = [label, sec];
    chartArray.push(a);
  });

  // Create and populate the data table.
  var data = google.visualization.arrayToDataTable(chartArray);

  var options = {
    width: 738,
    height: 400,
    curveType: 'function',
    legend: {
      position: 'none'
    },
    'chartArea': {
      'width': '90%',
      'height': '90%'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('medianReplyTimesChart'));
  chart.draw(data, options);
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

Himmeli.updateSettings = function(settings) {
  // token
  var token = $('input[name=authenticity_token]').val();

  // request object
  var json = {
    'utf8': '✓',
    'authenticity_token': token,
    'setting': settings
  };

  // request
  return $.ajax({
    dataType: 'json',
    method: 'put',
    url: '/settings/' + Himmeli.settings.id,
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
  console.log(Himmeli.htmlPills());
  var stats = '<div class="stats"><div class="content">' +
    '<a href="#" class="btn btn-primary close-btn">Palaa peliin</a>' +
    '<h1>' + Himmeli.first_name + ' ' + Himmeli.last_name + '</h1>' +
    '<hr>' +
    '<ul class="nav nav-pills chart-pills"></ul>' +
    '<h3>Pisteitä per pelikerta</h3>' +
    '<div id="scoresPerEventChart" style="width: 738px; height: 400px;"></div>' +
    '<h3>Keskimääräinen vastausaika (mediaani)</h3>' +
    '<div id="medianReplyTimesChart" style="width: 738px; height: 400px;"></div>' +
    '</div></div>';

  $body.append(stats);

  // update stats
  $.get('/people/' + Himmeli.id + '.json').then(function(data) {
    Himmeli['scoresPerEvent'] = data.scoresPerEvent;
    Himmeli['medianReplyTimes'] = data.medianReplyTimes;

    $('.chart-pills').append(Himmeli.htmlPills());

    $('.chart-pills a').on('click', function(e) {
      e.preventDefault();

      var $tgt = $(e.target);

      if ($tgt.parent().hasClass('disabled')) return false; // disabled buttons

      $tgt.parent('li').addClass('active').siblings().removeClass('active');

      setTimeout(function() {
        Himmeli.scoresPerEventChart($tgt.data('level'));
        Himmeli.medianReplyTimesChart($tgt.data('level'));
      }, 500);
    });

    $('.close-btn').on('click', function(e) {
      e.preventDefault();

      $('.stats').fadeOut(700, function() {
        $('.close-btn').off('click');
        $('.chart-pills a').off('click');
        $('.stats').remove();
        $('#cr-stage').show();
      });
    });

    $('.stats').fadeIn(700, function() {
      setTimeout(function() {
        Himmeli.scoresPerEventChart();
        Himmeli.medianReplyTimesChart();
      }, 1000);
    });
  });
};

$('body').on('click', '.stats_button', function(e) {
  Himmeli.statsView();
  $('#cr-stage').hide();
});