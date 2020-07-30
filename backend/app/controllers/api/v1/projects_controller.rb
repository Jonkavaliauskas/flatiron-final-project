class Api::V1::ProjectsController < ApplicationController
    skip_before_action :logged_in?, only: [:index, :create, :destroy, :update]
    def index 
        projects = Project.all 
        render json: projects
    end


    def create
        #byebug... and in the then debugger
        user = User.find_by(email: params[:email])
        profile = user.profile
        project = Project.create(project_params)
        project.profile = profile
       
        if project.valid?
            project.save
            render json: project
        else
            render json: {error: project.errors.full_messages }, status: :not_acceptable
        end
    #     # @user = User.find_by(email: params[:email])
    #     # if @user.profile
    #     #     @user.profile.projects.create(project_params)
    #         # @user.profile.projects.append(Project.create(project_params))
    # #         @user.profile.save
    # #         if @user.valid?
    # #             @user.save
    # #             render json: @user.profile.projects[-1]
    # #             # byebug
    # #             # puts("_____________________________________")
    # #             # puts(profile.attributes)
    # #             # puts("_____________________________________")
    # #         else 
    # #             render json: {error: "Failed to create profile :("}, status: :not_acceptable      
    # #         end    
    # #         
    # #         # @profile = Profile.find_by(params[:id])
    # #         # @profile.project = Project.create(project_params)
    # #     else    
    # #         render json: {error: "Failed to create project :("}, status: :not_acceptable
    # #     end
        
    # #     render json: projects
    end

    def destroy
        

    Project.find(params[:id]).destroy
    render json: {status: "deleted_successfully"}
    
    end

    def update
        user = User.find_by(email: params[:email])
        profile = user.profile
        project = Project.find_by(id: params[:id])
        project.profile = profile
        project.assign_attributes(project_params)
        if project.valid?
            project.save
            render json: project
        else
            render json: {error: project.errors.full_messages }, status: :not_acceptable
        end
    end    

    private 

    def project_params
        params.require(:project).permit!
    end        
end
