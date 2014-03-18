class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :person, index: true
      t.integer :duration, :default => 0
      t.integer :level, :default => 0, index: true
      t.integer :scores, :default => 0, index: true

      t.timestamps
    end
  end
end
