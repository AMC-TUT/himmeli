class EventSerializer < ActiveModel::Serializer
  attributes :id, :duration, :level, :scores
  has_one :person
end
