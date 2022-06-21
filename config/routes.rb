Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post "game", to: "game#create"
      post "game/join", to: "game#join"
      post "game/play", to: "game#play_move"
      get "game/:game_id", to: "game#get"
    end
  end

  mount ActionCable.server => "/cable"
  # Defines the root path route ("/")
  # root "articles#index"
end
