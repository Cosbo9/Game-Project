class CreateHostUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :host_users do |t|

      t.timestamps
    end
  end
end
