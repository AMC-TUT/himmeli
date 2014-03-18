// for more details see: http://emberjs.com/guides/models/defining-models/

Himmeli.Item = DS.Model.extend({
  event: DS.belongsTo('Himmeli.Event'),
  duration: DS.attr('number'),
  answer: DS.attr('boolean')
});
