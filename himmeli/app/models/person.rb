class Person < ActiveRecord::Base
  has_one :setting
  has_many :events
  has_many :items, through: :events

  validates :first_name, :presence => true
  validates :last_name, :presence => true

  def scores_per_event_per_level
    version = Version.last # TODO select the one with max value
    size = version.rows * version.columns

    counter = 1
    array = []

    while counter <= size  do
      array.push Event.select('id, scores, aborted').where("level = ? AND person_id = ?", counter, self.id)
      counter += 1
    end
    array
  end

  def median_reply_times
    size = 6 # level count

    counter = 1
    array = []

    while counter <= size do
      ary = []
      events = Event.where('level = ? AND person_id = ?', counter, self.id)

      events.each do |event|
        durations = Item.select('duration').where('event_id = ?', event).map {|x| x.duration}

        if not durations.empty?
          ary.push (median(durations).to_i / 1000) # ms -> s
        end
      end

      counter += 1
      array.push(ary)
    end

    # events = self.events
    # events.each do |event|
    #   durations = Item.select('duration').where('event_id = ?', event).map {|x| x.duration}

    #   if not durations.empty?
    #     array.push (median(durations).to_i / 1000) # ms -> s
    #   end
    # end
    # puts array.to_yaml

    array
  end

  private

    def median(ary)
      return nil if ary.empty?
      mid, rem = ary.length.divmod(2)
      if rem == 0
        ary.sort[mid-1,2].inject(:+) / 2.0
      else
        ary.sort[mid]
      end
    end

end
