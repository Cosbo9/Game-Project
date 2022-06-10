class AddTokenToTokens < ActiveRecord::Migration[7.0]
  def change
    add_column :tokens, :token, :string
  end
end
