# web-app
https://angularappjn.azurewebsites.net

Web application that allows users to:
- register an account
- login/logout
- add post
- delete their posts
- follow & unfollow another users (follow another user means adding to follwing list and showing followed user posts in home page)
- to change his account properties

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* #### These project is attached to web-server project so you should download it first: https://github.com/JakubNowikowski/web-server 

What things you need to install the software and how to install them

First you will need Node.js (10.15 will do):
```
https://nodejs.org/en/
```

Next thing is npm istalled globally or in the project directory:
```
npm install
```

The same with Angular:
```
npm install -g @angular/cli
```

Installing Node.js development package for Visual Studio is also recommended.

### Building the solution

To properly use the build solution you need to set a database in Visual Studio:
* Tools > NuGet Package Manager > Package Manager Console
* Run the following command:
```
Update-Database
```
Restart of Visual Studio might be needed.

## After startup

To see all mentioned features immediately without registering several users, there are already 4 prototype users added (each user has attached post and follow connection with another user). So to see all the functionality without adding your own users you can log in as user1. 

* Login: user1
* Password: aaaaaa
