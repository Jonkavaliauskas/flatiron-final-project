class Profile < ApplicationRecord
    belongs_to :user
    
    has_many :projects
    has_many :profile_languages
    has_many :languages, through: :profile_languages
    has_many :profile_interests
    has_many :interests, through: :profile_interests
    has_many :profile_work_options
    has_many :work_options, through: :profile_work_options
    has_one_attached :image
    has_one_attached :resume
end
