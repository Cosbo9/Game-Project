class AddUserTypesToGames < ActiveRecord::Migration[7.0]
  def change
    change_table(:games) do |t|
      t.references :hosting_user, foreign_key: { to_table: 'guest_users' }
      t.references :joining_user, foreign_key: { to_table: 'guest_users' }
    end
  end
end
