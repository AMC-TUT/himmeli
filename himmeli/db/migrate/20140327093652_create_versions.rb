class CreateVersions < ActiveRecord::Migration
  def change
    create_table :versions do |t|
      t.integer :hit_points, :default => 0
      t.integer :target_speed, :default => 0
      t.integer :rows, :default => 0
      t.integer :columns, :default => 0

      t.timestamps
    end
  end
end
