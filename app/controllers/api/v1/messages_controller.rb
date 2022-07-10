class Api::V1::MessagesController < ApplicationController

    before_action :authenticate_user!, except: :send_game_message

    def create
        message = current_user.messages.build(message_params)
        message.save!
    end

    def send_game_message
      game = Game.find(message_params[:game_id])
      if user_signed_in?
        username = current_user.email.split('@')[0] 
      elsif message_params[:token]
        token = Token.find_by token: message_params[:token]
        if token
          user = token.guest_user
          username = "Guest_#{user.id}"  
        end
      end
      message = {user: username, body: message_params[:message]}
      GameChannel.broadcast_to(game, {type: "chat_message", message: message})
    end
    
    def send_lobby_message
      user = current_user if user_signed_in?
      username = user.email.split('@')[0]
      complete_message = {user: username, body: message_params[:message]}
      ActionCable.server.broadcast("lobby", {type: "lobby_message", message: complete_message})
    end

    private

    def message_params
        params.permit(:body, :token, :game_id, :message)
    end

end