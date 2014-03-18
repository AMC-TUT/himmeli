// for more details see: http://emberjs.com/guides/models/defining-models/

Himmeli.Person = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  scores: DS.attr('number'),
  level: DS.attr('number')
});
