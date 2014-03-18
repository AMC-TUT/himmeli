// for more details see: http://emberjs.com/guides/models/defining-models/

Himmeli.Event = DS.Model.extend({
  person: DS.belongsTo('Himmeli.Person'),
  duration: DS.attr('number'),
  level: DS.attr('number'),
  scores: DS.attr('number')
});
