class RedZonesController < ApplicationController
  def index
    red_zones = RedZone.select("id, name, ST_AsGeoJSON(geom) AS geojson")
    render json: red_zones.map { |zone| { id: zone.id, name: zone.name, geojson: JSON.parse(zone.geojson) } }
  end
end
