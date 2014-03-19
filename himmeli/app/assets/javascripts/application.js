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

$('.scores-chart-pills a').on('click', function(e) {
  e.preventDefault();

  var $tgt = $(e.target);

  $tgt.parent('li').addClass('active').siblings().removeClass('active');

  drawScoresPerEventChart( $tgt.data('level') );

});

var Himmeli = {};

var pid = 6;
$.get('http://dev:3000/people/' + pid + '.json').then(function(data) {
  Himmeli = data;
});

function drawScoresPerEventChart(level) {
  var level = level || 1,
    events = Himmeli.scoresPerEvent[level-1],
    data = _.pluck(events, 'scores'),
    labels = [];

  _.each(events, function(e, index) {
    labels.push(index+1 + '');
  });


  var lineChartData = {
      labels : labels, // ["January","February","March","April","May","June","July"],
      datasets : [
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : data //[28,48,40,19,96,27,100]
        }
      ]

    };

    var chartLine = new Chart(document.getElementById("scoresPerEventChart").getContext("2d")).Line(lineChartData);
}

setTimeout(function() {
  drawScoresPerEventChart();
}, 300);





