Rails.application.routes.draw do
  get "maps/index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end

Rails.application.routes.draw do
  root "maps#index" # This sets the root path to the MapsController's index action
  get "maps", to: "maps#index", as: :maps # This creates the `maps_path` helper
  get '/france_geojson', to: 'maps#france_geojson'

end
Rails.application.routes.draw do
  resources :red_zones, only: [:index]
end
