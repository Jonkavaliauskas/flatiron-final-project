class WorkOption < ApplicationRecord
    has_many :profile_workoptions
    has_many :profiles, through: :profile_workoptions
end
