class CreateRedZones < ActiveRecord::Migration[7.0]
  def change
    create_table :red_zones do |t|
      t.string :name
      t.geometry :geom, geographic: true, srid: 4326  # Use PostGIS geometry
      t.timestamps
    end
  end
end
