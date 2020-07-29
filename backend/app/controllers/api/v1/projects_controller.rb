class Api::V1::ProjectsController < ApplicationController

    def index 
        projects = Project.all 
        render json: projects
    end


    # def create
    #     @user = User.find_by(email: params[:email])
    #     if @user.profile

    #         @user.profile.projects.append(Project.create(project_params))
    #         @user.profile.save
    #         if @user.valid?
    #             @user.save
    #             render json: @user.profile.projects[-1]
    #             # byebug
    #             # puts("_____________________________________")
    #             # puts(profile.attributes)
    #             # puts("_____________________________________")
    #         else 
    #             render json: {error: "Failed to create profile :("}, status: :not_acceptable      
    #         end    
    #         # su @user.save reik validation
    #         # @profile = Profile.find_by(params[:id])
    #         # @profile.project = Project.create(project_params)
    #     else    
    #         render json: {error: "Failed to create project :("}, status: :not_acceptable
    #     end
        
    #     render json: projects
    # end

    def destroy
        

    Project.find(params[:id]).destroy
    render json: {status: "deleted_successfully"}
    
    end

    private 

    def project_params
        params.require(:project).permit!
    end        
end
