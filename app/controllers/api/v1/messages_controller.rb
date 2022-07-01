class Api::V1::MessagesController < ApplicationController

    before_action :authenticate_user!

    def create
        message = current_user.messages.build(message_params)
        message.save!
    end

    private

    def message_params
        params.require(:message).permit(:body)
    end

end