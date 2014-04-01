class RemoveKeyFromSetting < ActiveRecord::Migration
  def change
    remove_column :settings, :key, :string
  end
end
