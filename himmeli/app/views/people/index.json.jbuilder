json.array!(@people) do |person|
  json.extract! person, :id, :first_name, :last_name, :scores, :level
  json.url person_url(person, format: :json)
end
