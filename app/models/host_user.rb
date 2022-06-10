class HostUser < ApplicationRecord
    has_many :tokens
    has_many :games
end
