json.array!(@events) do |event|
  json.extract! event, :id, :person_id, :duration, :level, :scores
  json.url event_url(event, format: :json)
end
