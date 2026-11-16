Rails.application.routes.draw do
  # Devise is only used for its model/auth helpers; the API defines its own endpoints.
  devise_for :users, skip: :all

  resource :login, only: [ :create, :destroy ], controller: :sessions
  resources :users, only: [ :create ]
  resources :songs, only: [ :index ]
  resources :playlists, only: [ :create, :update, :destroy ]

  get "playlists/:user_id" => "playlists#user_playlists", as: :user_playlists
  get "search/songs" => "searches#songs", as: :search_songs

  # Health check for load balancers and uptime monitors.
  get "up" => "rails/health#show", as: :rails_health_check
end
