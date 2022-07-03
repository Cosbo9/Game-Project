class Api::V1::MessagesController < ApplicationController

    before_action :authenticate_user!, except: :send_game_message

    def create
        message = current_user.messages.build(message_params)
        message.save!
    end

    def send_game_message
      game = Game.find(message_params[:game_id])
      broadcast_to(game, {message: {user: message_params[:user], body: message_params[:body]}})
    end

    def send_lobby_message
      broadcast("lobby", {message: {user: message_params[:user], body: message_params[:body]}})
    end

    private

    def message_params
        params.require(:message).permit(:body, :user, :game_id)
    end

end