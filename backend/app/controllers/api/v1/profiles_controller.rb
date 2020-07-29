class Api::V1::ProfilesController < ApplicationController
    skip_before_action :logged_in?, only: [:create, :destroy]
    def index 
        @profiles = Profile.all 
        render json: @profiles
    end

    def show
        @profile = Profile.find(params[:id])
        render json: @profile
    end

    def create
        
        @user = User.find_by(email: params[:email])
        
        if @user
            @user.profile = Profile.create(profile_params)
            if @user.valid?
                @user.save
                render json: @user.profile
                
            else 
                render json: {error: "Failed to create profile :("}, status: :not_acceptable      
            end    
        end    
    end


    def destroy
        

      Profile.find(params[:id]).destroy
      render json: {status: "deleted_successfully"}
    
    end

    private 

    def profile_params
        params.require(:profile).permit!
    end    
end    