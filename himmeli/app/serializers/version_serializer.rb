class VersionSerializer < ActiveModel::Serializer
  attributes :id, :hit_points, :target_speed, :rows, :columns
end
