class SettingSerializer < ActiveModel::Serializer
  attributes :id, :key, :value
  has_one :person
end
