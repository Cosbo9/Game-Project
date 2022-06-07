class Api::V1::GameController < ApplicationController
  def create
    user = GuestUser.new
    user.save
    token = Token.create({ guest_user: user, token: generate_code(20) })
    token.save!
    game = Game.create({color:  api_v1_game_params[:color], order:  api_v1_game_params[:order], guest_user: user})
    game.save
    puts params[:color]
    render json: { user: user, token: token, game: game }
  end

  def get
  end

  private

  def generate_code(number)
    charset = Array("A".."Z") + Array("a".."z")
    Array.new(number) { charset.sample }.join
  end
  
  def api_v1_game_params
    params.permit(:color, :order)
end
end
