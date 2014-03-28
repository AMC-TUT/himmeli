class Event < ActiveRecord::Base
  belongs_to :person
  has_many :items
  belongs_to :version

  accepts_nested_attributes_for :items

  validates :person, :presence => true
  validates :version_id, :presence => true
end
