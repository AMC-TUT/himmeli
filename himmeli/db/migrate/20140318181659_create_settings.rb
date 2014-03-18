class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.references :person, index: true
      t.string :key
      t.string :value

      t.timestamps
    end
  end
end
