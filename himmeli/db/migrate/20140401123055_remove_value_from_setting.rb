class RemoveValueFromSetting < ActiveRecord::Migration
  def change
    remove_column :settings, :value, :string
  end
end
