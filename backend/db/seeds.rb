# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'faker'

User.destroy_all
Language.destroy_all
Profile.destroy_all
Interest.destroy_all
WorkOption.destroy_all
Project.destroy_all
ProfileInterest.destroy_all
ProfileLanguage.destroy_all
ProfileWorkOption.destroy_all

User.reset_pk_sequence
Language.reset_pk_sequence
Profile.reset_pk_sequence
Interest.reset_pk_sequence
WorkOption.reset_pk_sequence
Project.reset_pk_sequence
ProfileInterest.reset_pk_sequence
ProfileLanguage.reset_pk_sequence
ProfileWorkOption.reset_pk_sequence


#generate 10 users
(1..10).each do |id|
    User.create(
        #id: id,
        email: Faker::Internet.email,
        password: "augustas"
        )
end 



   

language1 = Language.create(name: "Python")
language2 = Language.create(name: "Ruby")
language3 = Language.create(name: "Javascript")
language4 = Language.create(name: "HTML")
language5 = Language.create(name: "C")
language6 = Language.create(name: "SQL")

languages = [language1.id, language2.id, language3.id, language4.id,
language5.id, language6.id]

interest1 = Interest.create(name: "Backend")
interest2 = Interest.create(name: "Frontend")
interest3 = Interest.create(name: "Data Science")
interest4 = Interest.create(name: "Cybersecurity")
interest5 = Interest.create(name: "Trading")
interest6 = Interest.create(name: "Hardware")

interests = [interest1.id, interest2.id, interest3.id, interest4.id, interest5.id, 
interest6.id]

work_option1 = WorkOption.create(name: "Full-time Employment")
work_option2 = WorkOption.create(name: "Part-time Employment")
work_option3 = WorkOption.create(name: "Paid Internships")
work_option4 = WorkOption.create(name: "Unpaid Internships")

work_options = [work_option1.id, work_option2.id, work_option3.id, work_option4.id]


# # Add user4 to the list of users that recommend user3;
# # In other words, user4 recommends user3, user3 is recommended by user4
# # This is the equivalent of user4.recommendees << user3



# profile1 = Profile.create(age: 13, bio: "this is profile1", major: "cs", user_id: User.all.sample.id)
# profile2 = Profile.create(age: 23, bio: "this is profile2", major: "english", user_id: User.all.sample.id)
# profile3 = Profile.create(age: 43, bio: "this is profile3", major: "cs", user_id: User.all.sample.id)

(1..10).each do |id|
    p = Profile.create(
        name: Faker::Name.name,
        age: (18..100).to_a.sample,
        bio: Faker::Hipster.paragraph,
        university: Faker::Educator.university,
        user_id: User.all.sample.id,
        # image: "../download.jpeg",
        language_ids: rand(1..6).times.map { languages.sample },
        interest_ids: rand(1..6).times.map { interests.sample },
        work_option_ids: rand(1..4).times.map { work_options.sample },
        )
        

    # s = rand(1..10).to_s + ".jpg"
    # p.image.attach(io: File.open(Rails.root + 'app/assets/images/' + s), filename: s)
end 

(1..10).each do |id|
    proj = Project.create(
        title: Faker::Music::GratefulDead.song,
        year: rand(2012..2017),
        description: Faker::Hipster.paragraph,
        profile_id: Profile.all.sample.id,
    )
end    