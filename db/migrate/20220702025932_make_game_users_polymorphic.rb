class MakeGameUsersPolymorphic < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :hosting_user_type, :string
    add_column :games, :joining_user_type, :string
  end
end
