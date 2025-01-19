class Place < ApplicationRecord
  self.class_eval do
    def self.rgeo_factory_for_column(name)
      RGeo::ActiveRecord::SpatialFactoryStore.instance
    end
  end
end
