class GameChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber to this channel.
  def subscribed
    p "Connected to game channel finally"
    stream_for(Game.find(1))
  end

end