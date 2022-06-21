class Api::V1::GameController < ApplicationController
  def create
    user = GuestUser.new
    user.save
    token = Token.create({ guest_user: user, token: generate_code(20) })
    token.save!
    game = Game.create({ color: api_v1_game_params[:color], order: api_v1_game_params[:order], hosting_user: user, moves: "" })
    game.save!
    render json: { user: user, token: token, game: game }
    # GameChannel.broadcast_to(game, {game: game, user: user, token: token})
  end

  def join
    game = Game.find(api_v1_game_params[:game_id])
    if game.full?
      return render json: "game is full", :status => :bad_request
    end
    if !api_v1_game_params[:token]
      user = GuestUser.new
      user.save
      token = Token.create({ guest_user: user, token: generate_code(20) })
    else
      found_token = Token.find_by({ token: api_v1_game_params[:token] })
      if found_token == nil || found_token.guest_user == game.hosting_user
        return render json: "Bad token", :status => 401
      end
    end
    game.joining_user = user || found_token.guest_user
    game.save
    GameChannel.broadcast_to(game, {game: game, user: game.joining_user, token: game.joining_user.token})
  end

  def get
    game = Game.find(api_v1_game_params[:game_id])
    GameChannel.broadcast_to(game, game)
    # render json: game
  end

  def play_move
    game = Game.find(params[:game_id])
    new_move = params[:new_move]
    if correct_player_turn?(game, params[:token])
      game_state = GameState.new(game.moves, new_move)
      game_state.handle_turn
      game.moves = game_state.moves
      if game_state.is_a_winner?
        game.make_player_winner
      elsif game_state.is_board_full?
        game.make_game_tie
      end
      game.switch_player if game_state.is_move_valid?
      game.save
      response = {
        game_id: game.id,
        moves: game.moves,
        status: game.status,
      }
    else
      response = {
        game_id: game.id,
        moves: game.moves,
        status: game.status,
        error: "Incorrect User token"
      }
    end
    GameChannel.broadcast_to(game, response)
    # render json: response
  end

  private

  def generate_code(number)
    charset = Array("A".."Z") + Array("a".."z")
    Array.new(number) { charset.sample }.join
  end

  def api_v1_game_params
    params.require(:game).permit(:color, :order)
    # params.permit(:game, :color, :order, :token, :game_id)
  end


  def correct_player_turn?(game, token)
    if game.status == "host_turn"
      user = GuestUser.find(game.hosting_user_id)
    elsif game.status == "joining_turn"
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
