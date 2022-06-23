class RemoveOrderFromGame < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :order
  end
end
