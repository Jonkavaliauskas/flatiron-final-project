class Api::V1::UsersController < ApplicationController
    skip_before_action :logged_in?, only: [:create]
    
    
    def index 
        @users = User.all 
        render json: @users
    end
    
    def create 
    
        puts("_____________________________________")
        puts(user_params)
        puts("_____________________________________")
        @user = User.new(user_params)
    
        if @user.valid?
            @user.save
            render json: {email: @user.email, profile: @user.profile, token: encode_token({user_id: @user.id})}
        else 
            render json: {error: "Failed to create user :("}, status: :not_acceptable
        end
    end

    private

    def user_params
        params.permit(:email, :password)
    end



end
