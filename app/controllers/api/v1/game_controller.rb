

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
    # see if game exists and is not already full
    game = Game.find(api_v1_game_params[:game_id])
    if game.full?
      # leave
    end
    # if not leave
    # otherwise check if joining user has token
    if !api_v1_game_params[:token]
      # if not assume joining user is a new guest
      user = GuestUser.new
      user.save
      token = Token.create({ guest_user: user, token: generate_code(20) })
    end


    # if joining user DOES have token, make sure token does not belong to game host

    found_token = Token.find_by({token: api_v1_game_params[:token]})
    # is the person joining the same as the person who made it?
    if found_token != nil && found_token.guest_user == game.hosting_user
      # leave
    end
    game.joining_user = user
    game.save
  end

  def get
  end

  def play_move
    game = Games.find(params[:game_id])
    new_move = params[:new_move]

    game_state = GameState.new(game.moves, new_move)
    game_state.handle_move
    game.moves = game_state.moves
    game.save
    render json: {
      game: game,
      is_winner: game_state.is_a_winner?,
      is_tie: game_state.is_board_full?,
    }
  end

  private

  def generate_code(number)
    charset = Array("A".."Z") + Array("a".."z")
    Array.new(number) { charset.sample }.join
  end

  def api_v1_game_params
    params.permit(:game, :color, :order, :token, :game_id)
  end
end
