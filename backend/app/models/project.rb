class Project < ApplicationRecord
    belongs_to :profile
    has_many_attached :image
end
