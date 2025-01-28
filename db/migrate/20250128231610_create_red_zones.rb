class CreateRedZones < ActiveRecord::Migration[6.1]
  def change
    create_table :red_zones do |t|
      t.string :name
      t.geometry :geom, geographic: true
      t.timestamps
    end
  end
end