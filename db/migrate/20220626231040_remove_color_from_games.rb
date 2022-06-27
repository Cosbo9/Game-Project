class RemoveColorFromGames < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :color
  end
end
