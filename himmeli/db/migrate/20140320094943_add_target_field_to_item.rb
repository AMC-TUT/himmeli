class AddTargetFieldToItem < ActiveRecord::Migration
  def change
    add_column :items, :target, :integer, :default => 0
  end
end
