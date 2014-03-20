class RemoveAnswerFromItem < ActiveRecord::Migration
  def change
    remove_column :items, :answer, :boolean
  end
end
