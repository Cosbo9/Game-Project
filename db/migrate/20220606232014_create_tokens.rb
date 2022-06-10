class CreateTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :tokens do |t|
      t.timestamps
      t.references :guest_user, foreign_key: true
    end
  end
end
