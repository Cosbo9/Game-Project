class CreateGuestTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :guest_tokens do |t|

      t.timestamps
    end
  end
end
