class AddChoicesToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :color, :string
    add_column :games, :order, :integer
  end
end
