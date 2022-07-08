class User < ApplicationRecord
  has_many :games, as: :hosting_user
  has_many :games, as: :joining_user
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
  
  has_many :messages
end
