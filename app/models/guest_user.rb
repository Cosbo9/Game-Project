class GuestUser < ApplicationRecord
    has_many :tokens
    has_many :games, as: :hosting_user
    has_many :games, as: :joining_user
end
