Rails.application.routes.draw do
  devise_for :users

  constraints format: :json do
    resource :login, only: [:create], controller: :sessions
    resources :users, only: [:create]
    resources :songs, only: [:index, :show]
    resources :playlists, only: [:create, :update, :destroy, :index]
  end

end
