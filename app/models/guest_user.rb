class GuestUser < ApplicationRecord
    has_many :tokens
end
