class GameChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber to this channel.
  def subscribed
    game = Game.find(params[:id])
    stream_for(game)
    response = {
      game_id: game.id,
      moves: game.moves,
      status: game.status,
    }
    broadcast_to(game, response)
  end

  def unsubscribed
    
  end

end