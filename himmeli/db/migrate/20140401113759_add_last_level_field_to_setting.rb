class AddLastLevelFieldToSetting < ActiveRecord::Migration
  def change
    add_column :settings, :last_level, :integer, :default => 1
  end
end
