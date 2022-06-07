require_relative "../../../../services/game_state.rb"

class Api::V1::GameController < ApplicationController
    def create
        user = GuestUser.new
        user.save
        token = Token.create({guest_user: user})
        token.save!
        render json: {user: user, token: token}
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
        is_tie: game_state.is_board_full?
      }

    end
end
