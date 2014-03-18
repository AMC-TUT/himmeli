class ItemSerializer < ActiveModel::Serializer
  attributes :id, :duration, :answer
  has_one :event
end
