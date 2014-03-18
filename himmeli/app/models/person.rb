class Person < ActiveRecord::Base
  has_one :setting
  has_many :events
  has_many :items, through: :events
end
