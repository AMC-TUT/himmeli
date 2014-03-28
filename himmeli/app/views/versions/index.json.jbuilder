json.array!(@versions) do |version|
  json.extract! version, :id, :hit_points, :target_speed, :rows, :columns
  json.url version_url(version, format: :json)
end
