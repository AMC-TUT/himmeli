class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :first_name
      t.string :last_name
      t.integer :scores, :default => 0
      t.integer :level, :default => 1

      t.timestamps
    end
  end
end
