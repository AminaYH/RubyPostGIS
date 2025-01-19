class MapsController < ApplicationController
  def index
    @locations = Location.all

    # Convert locations to GeoJSON
    @geojson = @locations.map do |location|
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [location.coordinates.x, location.coordinates.y]
        },
        properties: {
          name: location.name
        }
      }
    end

    respond_to do |format|
      format.html # Default HTML view
      format.json { render json: @geojson } # GeoJSON format for Leaflet
    end
  end
end
