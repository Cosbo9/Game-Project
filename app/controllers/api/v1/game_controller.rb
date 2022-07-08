class Api::V1::GameController < ApplicationController
  def create
    if user_signed_in?
      user = current_user
    elsif api_v1_game_params && api_v1_game_params[:token]
        tokenstring = api_v1_game_params[:token]
        token = Token.find_by token: tokenstring
        user = token.guest_user
    else
      user = GuestUser.new
      user.save
      token = Token.create({ guest_user: user, token: generate_code(20) })
      token.save!
    end
    game = Game.create({ hosting_user: user, moves: "" })
    game.save!

    if game.hosting_user_type == "User"
      render json: { game_id: game.id }
    else
      render json: { game_id: game.id, token: token.token }
    end
  end

  def join
    game = Game.find(api_v1_game_params[:game_id])
    if game.full?
      return render json: "game is full", :status => :bad_request
    end
    if user_signed_in?
      user = current_user
    elsif api_v1_game_params && api_v1_game_params[:token]
        tokenstring = api_v1_game_params[:token]
        token = Token.find_by token: tokenstring
        user = token.guest_user
    else
      user = GuestUser.new
      user.save
      token = Token.create({ guest_user: user, token: generate_code(20) })
      token.save!
    end
    if game.hosting_user == user
      throw "Given User is already Host"
      render json: {error: "Given User is already Host"}, :status => :bad_request
    else
      game.joining_user = user
      game.save
      GameChannel.broadcast_to(game, {type: "data", game: game})
    end
    render json: { game_id: game.id, token: token } if game.joining_user_type == "GuestUser"
    render json: { game_id: game.id } if game.joining_user_type == "User"

  end

  def get
    game = Game.find(params[:game_id])
    GameChannel.broadcast_to(game, {type: "data", game: game})
  end

  def play_move
    game = Game.find(api_v1_game_params[:game_id])
    new_move = api_v1_game_params[:new_move]
    if correct_player_turn?(game, api_v1_game_params[:token])
      game_state = GameState.new(game, game.moves, new_move)
      move_valid = game_state.is_move_valid?
      game_state.handle_turn
      game.moves = game_state.moves
      if game_state.is_a_winner?
        game.make_player_winner
      elsif game_state.is_board_full?
        game.make_game_tie
      end
      game.switch_player if move_valid
      game.save
      
      response = {
        type: "data",
        game: game
      }
    else
      response = {
        type: "data",
        game: game,
        error: "Incorrect User token"
      }
    end
    GameChannel.broadcast_to(game, response)
  end

  def get_all_games()
    render json: Game.
    where(joining_user: nil).
    where.not(hosting_user: nil).
    where.not(status: ["host_win", "joining_win", "tie"])
  end

  private

  def generate_code(number)
    charset = Array("A".."Z") + Array("a".."z")
    Array.new(number) { charset.sample }.join
  end

  def api_v1_game_params
    params.fetch(:game).permit(:color, :game_id, :token, :new_move)
    # params.permit(:game, :color, :order, :token, :game_id)
  end


  def correct_player_turn?(game, token)
  
    if game.status == "host_turn"
      return true if user_signed_in? && game.hosting_user == current_user
      user = GuestUser.find(game.hosting_user_id)
    elsif game.status == "joining_turn"
      return true if user_signed_in? && game.joining_user == current_user
      user = GuestUser.find(game.joining_user_id)
    end
    if user.tokens[0].token == token
      return true
    else
      raise "incorrect user token"
      return false
    end
  end

end
