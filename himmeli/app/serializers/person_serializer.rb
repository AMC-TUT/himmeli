class PersonSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :scores, :level
end
