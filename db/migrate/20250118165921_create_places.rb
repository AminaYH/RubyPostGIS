class CreatePlaces < ActiveRecord::Migration[7.2]
  def change
    create_table :places do |t|
      t.string :name
      t.st_point :location

      t.timestamps
    end
  end
end
