class Item < ActiveRecord::Base
  belongs_to :event

  validates :event, :presence => true
end
