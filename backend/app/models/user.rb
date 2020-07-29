class User < ApplicationRecord
    has_one :profile
    has_secure_password

    validates :email, uniqueness: true

 
    # def authenticate(params)
    #     puts("--------------------------------------")
    #     puts(params)
    #     puts(user.password)
    #     puts("--------------------------------------")
    # end

end
