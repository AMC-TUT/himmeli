class Event < ActiveRecord::Base
  belongs_to :person
  has_many :items
end
