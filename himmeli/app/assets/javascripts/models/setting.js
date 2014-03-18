// for more details see: http://emberjs.com/guides/models/defining-models/

Himmeli.Setting = DS.Model.extend({
  person: DS.belongsTo('Himmeli.Person'),
  key: DS.attr('string'),
  value: DS.attr('string')
});
