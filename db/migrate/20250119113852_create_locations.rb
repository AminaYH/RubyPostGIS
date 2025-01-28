class CreateLocations < ActiveRecord::Migration[7.2]
  def change
    create_table :locations do |t|
      t.string :name
      t.st_point :coordinates, geographic: true,  srid: 4326

      t.timestamps
    end
  end
end
