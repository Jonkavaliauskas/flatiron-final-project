class Interest < ApplicationRecord
    has_many :profile_interests
    has_many :profiles, through: :profile_interests
end
