class AddCurrentPlayerToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :current_player, :integer, default: 0
  end
end
