class Api::V1::GameController < ApplicationController
    def create
        user = GuestUser.new
        user.save
        token = Token.create({guest_user: user})
        token.save!
        render json: {user: user, token: token}
    end

    def get
    end
end
