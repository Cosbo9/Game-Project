class Game < ApplicationRecord
    belongs_to :guest_user

    enum current_player: [ :host_user, :joining_user]


    
  def switch_player
    if current_player == "host_user"
      self.current_player = "joining_user"
    else 
      self.current_player = "host_user"
    end
  end
end
