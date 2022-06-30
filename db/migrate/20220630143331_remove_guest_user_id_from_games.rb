class RemoveGuestUserIdFromGames < ActiveRecord::Migration[7.0]
  def change
    remove_reference :games, :guest_user, index: true

  end
end
