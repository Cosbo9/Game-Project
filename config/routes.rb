Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post "game", to: "game#create"
      post "game/join", to: "game#join"
      post "game/play", to: "game#play_move"
      get "game/:game_id", to: "game#get"
      get "games", to: "game#get_all_games"
    end
  end

  mount ActionCable.server => "/cable"
  # Defines the root path route ("/")
  # root "articles#index"
end
