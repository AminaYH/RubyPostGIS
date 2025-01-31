class RedZone < ApplicationRecord
  self.rgeo_factory_generator = RGeo::Geos.factory_generator
  set_rgeo_factory_for_column(:geom, RGeo::Geos.factory(srid: 4326))
end
