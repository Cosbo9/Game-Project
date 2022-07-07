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
      # post "message", to: "messages#create"
      post "game/message", to: "messages#send_game_message"
      post "lobby/message", to: "messages#send_lobby_message"

    end
  end

  mount ActionCable.server => "/cable"
end
