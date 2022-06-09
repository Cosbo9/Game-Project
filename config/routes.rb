Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post "game", to: "game#create"
      post "game/play", to: "game#play_move"
    end
  end

  # Defines the root path route ("/")
  # root "articles#index"
end
