class AddUserTypesToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :host_user, :string
    add_column :games, :joining_user, :string
  end
end
