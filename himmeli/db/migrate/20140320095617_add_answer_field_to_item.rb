class AddAnswerFieldToItem < ActiveRecord::Migration
  def change
    add_column :items, :answer, :integer, :default => 0
  end
end
