class Setting < ActiveRecord::Base
  belongs_to :person

  validates :person, :presence => true
  validates :key, :presence => true
  validates :value, :presence => true
end
