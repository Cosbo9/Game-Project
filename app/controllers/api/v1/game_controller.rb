class Api::V1::GameController < ApplicationController
  def create
    user = GuestUser.new
    user.save
    token = Token.create({ guest_user: user, token: generate_code(20) })
    token.save!
    game = Game.create({ color: api_v1_game_params[:color], order: api_v1_game_params[:order], hosting_user: user })
    game.save!
    render json: { user: user, token: token, game: game }
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
  end

  def get
    game = Game.find(api_v1_game_params[:game_id])
    render json: game
  end

  def play_move
    game = Games.find(params[:game_id])
    new_move = params[:new_move]
    response = {
      game_id: game.id,
      moves: game.moves,
      is_winner: game_state.is_a_winner?,
      is_tie: game_state.is_board_full?,
    }
    if correct_player_turn?(game, params[:token])
      game_state = GameState.new(game.moves, new_move)
      game_state.handle_move
      game.moves = game_state.moves
      game.switch_user
      game.save
    else
      response[error] = "Incorrect User token"
    end
    render json: response
  end

  private

  def generate_code(number)
    charset = Array("A".."Z") + Array("a".."z")
    Array.new(number) { charset.sample }.join
  end

  def api_v1_game_params
    params.permit(:game, :color, :order, :token, :game_id)
  end

  def correct_player_turn?(game, token)
    if game.current_player == "host_user"
      user = GuestUser.find(game.host_user_id)
    elsif game.current_player == "joining_user"
      user = GuestUser.find(game.joining_user_id)
    end
    if user.token == token
      return true
    else
      raise "incorrect user token"
      return false
    end
  end
end
