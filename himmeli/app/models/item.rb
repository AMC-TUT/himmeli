class Item < ActiveRecord::Base
  belongs_to :event
  belongs_to :person

  # validates :event, :presence => true
  # validates :duration, :presence => true
  # validates :pointer, :presence => true
  # validates :target, :presence => true
  # validates :answer, :presence => true
end
