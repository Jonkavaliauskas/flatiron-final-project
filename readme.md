# Flatiron Web Development Bootcamp Final Project
## Made by Jonas Kavaliauskas


## Important: Remaining Bugs and Note to the Instructors
Authentication/authorization is still lacking somewhat. 

IMPORTANT: the video below details how to navigate the app without any malfunctioning. Essentially, once you create the user and login for the first time, you need to logout and login again for everything to run smoothly. If clicking on some pages doesn't work, refresh will do the trick. Finally, the results of some actions display to the user without the need for refreshing, whereas some others require this (this is the intended functionality for the long-term vision and development of the app).


## Short Description

This app is meant to serve as a platform to help developers connect with one another, as well as for companies looking to hire programmers. It is still under development. Demonstration video: https://www.youtube.com/watch?v=8hXZm7QgTuA&feature=youtu.be

## Features
- Create user
- Authenticate user
- Create profile
- Create projects for the profile
- Edit/update and delete profile, as well as projects
- List existing profiles
- Filter existing profiles
- Some frontend setup for future features, such as messages

## Install instructions

To install the app, git clone the repository in your local directory. Run:
```ruby
bundle install
```
To install all required gems. Run:
```ruby
rails db:migrate 
```
To migrate all changes to the database. 
```ruby
rails db:seed
```
To migrate seed the database. 

Finally, run 
```ruby
rails s
```
To start the server. Have display with 
```
open index.html
```
Remember to navigate to 
```
cd backend
```

For all the commands up till the last one. For the last one, switch to the frontend folder.

## Contributor's guide

Pull requests are welcome. Please make sure that your PR is well-scoped.
For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License

Copyright (c) 2020 Jonas Kavaliauskas

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 

> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.