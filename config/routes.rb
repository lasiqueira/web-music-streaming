Rails.application.routes.draw do
  devise_for :users


  resource :login, only: [:create, :destroy], controller: :sessions
  resources :users, only: [:create]
  resources :songs, only: [:index]
  resources :playlists, only: [:create, :update, :destroy]
  
  
  #custom routes

  #playlists
  get 'playlists/:user_id' => 'playlists#user_playlists'
  #search
  get 'search/:action' => 'searches#:action'
  
 

end
