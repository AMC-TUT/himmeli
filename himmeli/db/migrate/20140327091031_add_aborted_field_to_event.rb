class AddAbortedFieldToEvent < ActiveRecord::Migration
  def change
    add_column :events, :aborted, :integer, :default => 0
  end
end
