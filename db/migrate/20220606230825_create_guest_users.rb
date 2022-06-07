class CreateGuestUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :guest_users do |t|
      
      t.timestamps
    end
  end
end
