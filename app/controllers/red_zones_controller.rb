class RedZonesController < ApplicationController
  def index
    red_zones = RedZone.where.not(geom: nil)
                       .select(:id, :name, "ST_AsGeoJSON(geom) as geojson_geom")
    render json: red_zones.map { |zone|
      {
        id: zone.id,
        name: zone.name,
        geom: JSON.parse(zone.geojson_geom)
      }
    }
  end
end
