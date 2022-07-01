class ChatController < ApplicationController
    
    def index
        @messages = Message.all
    end

end
