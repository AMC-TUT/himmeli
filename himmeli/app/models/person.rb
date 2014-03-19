class Person < ActiveRecord::Base
  has_one :setting
  has_many :events
  has_many :items, through: :events

  validates :first_name, :presence => true
  validates :last_name, :presence => true
end
