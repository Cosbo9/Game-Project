class Game < ApplicationRecord
    belongs_to :hosting_user, polymorphic: true
    belongs_to :joining_user,  optional: true, polymorphic: true

    enum status: [ :host_turn, :joining_turn, :host_win, :joining_win, :tie]

    def full?
      hosting_user != nil && joining_user != nil
    end

    def switch_player
      if status == "host_turn"
        self.status = "joining_turn"
      elsif status == "joining_turn"
        self.status = "host_turn"
      end
    end

      def make_player_winner
        if status == "host_turn"
          self.status = "host_win"
        elsif status == "joining_turn"
          self.status = "joining_win"
        end
      end

      def make_game_tie
        self.status = "tie"
      end
end
