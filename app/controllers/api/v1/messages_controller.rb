class Api::V1::MessagesController < ApplicationController

    before_action :authenticate_user!, except: :send_game_message

    def create
        message = current_user.messages.build(message_params)
        message.save!
    end

    def send_game_message
      game = Game.find(message_params[:game_id])
      message = {user: message_params[:user], body: message_params[:body]}
      broadcast_to(game, {type: "game_message", message: message})
    end
    
    def send_lobby_message
      message = {user: message_params[:user], body: message_params[:body]}
      broadcast("lobby", {type: "lobby_message", message: message})
    end

    private

    def message_params
        params.require(:message).permit(:body, :user, :game_id)
    end

end