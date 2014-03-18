class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.references :event, index: true
      t.integer :duration, :default => 0
      t.boolean :answer, :default => false

      t.timestamps
    end
  end
end
