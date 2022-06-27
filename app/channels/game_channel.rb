class GameChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber to this channel.
  def subscribed
    stream_for(Game.find(params[:id]))
  end

end