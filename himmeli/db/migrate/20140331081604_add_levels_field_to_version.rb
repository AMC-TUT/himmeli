class AddLevelsFieldToVersion < ActiveRecord::Migration
  def change
    add_column :versions, :levels, :integer, :default => 6
  end
end
