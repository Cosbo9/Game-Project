class CreateJoiningUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :joining_users do |t|

      t.timestamps
    end
  end
end
