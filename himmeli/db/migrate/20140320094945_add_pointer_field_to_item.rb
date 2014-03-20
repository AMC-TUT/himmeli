class AddPointerFieldToItem < ActiveRecord::Migration
  def change
    add_column :items, :pointer, :integer, :default => 0
  end
end
