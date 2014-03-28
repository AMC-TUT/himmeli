class AddVersionFieldToEvent < ActiveRecord::Migration
  def change
    add_reference :events, :version, index: true
  end
end
