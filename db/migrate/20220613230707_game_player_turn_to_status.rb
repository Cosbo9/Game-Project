class GamePlayerTurnToStatus < ActiveRecord::Migration[7.0]
  def change
    change_table :games do |t|
      t.remove :current_player
      t.integer :status, default: 0
    end
  end
end
