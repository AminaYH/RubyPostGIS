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
  def france_geojson
    send_file Rails.root.join('public', 'france.geojson'), type: 'application/json', disposition: 'inline'
    geojson_data = {
      "type": "FeatureCollection",
      "features": [{
                     "type": "Feature",
                     "properties": {
                       "name": "France"
                     },
                     "geometry": {
                       "type": "MultiPolygon",
                       "coordinates": [[[[[-51.65779741067889, 4.156232408053029], [-52.249337531123956, 3.241094468596245], [-52.55642473001842, 2.504705308437053], [-52.939657151894956, 2.124857692875636], [-53.41846513529531, 2.053389187015981], [-53.554839240113544, 2.334896551925951], [-53.77852067728892, 2.376702785650082], [-54.08806250671725, 2.105556545414629], [-54.524754197799716, 2.311848863123785], [-54.2697051662232, 2.732391669115046], [-54.181726040246275, 3.189779771330421], [-54.00693050801901, 3.620037746592558], [-54.399542202356514, 4.212611395683467], [-54.47863298197923, 4.896755682795586], [-53.9580446030709, 5.756548163267765], [-53.618452928264844, 5.646529038918374], [-52.88214128275409, 5.409850979021584], [-51.8233428615259, 4.565768133966131], [-51.65779741067889, 4.156232408053029]]]]
                       ]}
                   }]
    }

    # Respond with the GeoJSON data
    render json: geojson_data
  end
end
