class AddMovesToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :moves, :string
  end
end
