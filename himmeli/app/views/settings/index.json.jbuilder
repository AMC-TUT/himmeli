json.array!(@settings) do |setting|
  json.extract! setting, :id, :person_id, :last_level
  #json.url setting_url(setting, format: :json)
end
