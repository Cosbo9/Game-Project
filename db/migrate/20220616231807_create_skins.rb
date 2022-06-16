class CreateSkins < ActiveRecord::Migration[7.0]
  def change
    create_table :skins do |t|
      t.string :name
      t.string :host_color
      t.string :joining_color
      t.timestamps
    end
  end
end
