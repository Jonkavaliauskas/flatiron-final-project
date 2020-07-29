#class ApplicationController < ActionController::API
class ApplicationController < ActionController::Base
    # protect_from_forgery with: :exception
    protect_from_forgery with: :exception
    skip_before_action :verify_authenticity_token
    
    before_action :logged_in?

    def encode_token(payload)
        JWT.encode(payload, "Yale2020")
    end
    
    def logged_in?
        headers = request.headers["Authorization"]
        token = headers.split(" ")[1]

        begin
            user_id = JWT.decode(token, "Yale2020")[0]["user_id"]
            user = User.find(user_id)
        rescue 
            user = nil
            
        end
        render json: {error: "Please Log In"} unless user
    end

end
