class Game < ApplicationRecord
    belongs_to :hosting_user, class_name: "GuestUser" 
    belongs_to :joining_user,  optional: true, class_name: "GuestUser"
    validates :order, presence: true
    validates :color, presence: true
    

    enum current_player: [ :host_user, :joining_user]

    def full?
      hosting_user != nil && joining_user != nil
    end
    private
end
