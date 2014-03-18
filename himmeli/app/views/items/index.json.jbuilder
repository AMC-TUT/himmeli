json.array!(@items) do |item|
  json.extract! item, :id, :event_id, :duration, :answer
  json.url item_url(item, format: :json)
end
