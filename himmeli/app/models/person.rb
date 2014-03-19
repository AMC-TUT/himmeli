class Person < ActiveRecord::Base
  has_one :setting
  has_many :events
  has_many :items, through: :events

  validates :first_name, :presence => true
  validates :last_name, :presence => true

  def scores_per_event_per_level
    array = []
    # TODO refactor
    array.push Event.select('id, scores').where("level = 1 AND person_id = ?", self.id)
    array.push Event.select('id, scores').where("level = 2 AND person_id = ?", self.id)
    array.push Event.select('id, scores').where("level = 3 AND person_id = ?", self.id)
    array.push Event.select('id, scores').where("level = 4 AND person_id = ?", self.id)
    array.push Event.select('id, scores').where("level = 5 AND person_id = ?", self.id)
    array.push Event.select('id, scores').where("level = 6 AND person_id = ?", self.id)
  end
end
