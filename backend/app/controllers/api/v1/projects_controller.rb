class Api::V1::ProjectsController < ApplicationController
    skip_before_action :logged_in?, only: [:index, :create, :destroy, :update]
    def index 
        projects = Project.all 
        render json: projects
    end


    def create
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


    # I carefully structure the frontend so that this would not present any issues. However, I am aware that
    # I should be only permitting specific params to pass for added safety and robustness of the code.
    def project_params
        params.require(:project).permit!
    end        
end
