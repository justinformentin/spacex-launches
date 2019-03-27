# Code Test - SpaceX Launch Tracker

Visit the site: [https://spacext.herokuapp.com/](https://spacext.herokuapp.com/)

Built with React, Express, Mongo, Node (MERN). Deployed with Heroku. I was going to deploy it on my own personal VPS, but Heroku is just so easy to deploy to, I couldn't resist.

It pulls data in from [SpaceX's API](https://github.com/r-spacex/SpaceX-API) and displays it on the home page. You can save individual launches by clicking the save button. The data will be saved into Mongo, and will be displayed on the `Saved` page. Saved launches can also be deleted by clicking the `Remove` button.

There is functional user authentication using Redux, Passport, JWT, and bcrypt-hash. Of course, if this was a production application, using an off-the-shelf authentication system is very often preferable. While using JWT, and most importantly using hashing instead of encryption greatly strengthens security, it's almost always better to use a full featured, battle hardened, name brand.

## Usage

Create a .env in the root of the project, you can use the .env-sample.

```bash

git clone https://github.com/justinformentin/spacex-launches.git
cd spacex-launches
npm i # Install server dependencies
cd client
npm i # Install client dependencies

# If you have mongo installed, to start the server open another cmd and run
mongod
# You can also create an account on mlab.com to run a mongo server remoately

npm run dev # Run client & server concurrently

# Or run `npm start` in both the main and client directories form two different cmds

```

### Why React?
This app was going to be so small, so I didn't want any decisions made for me with larger frameworks or boilerplates. I had a clear goal in mind, and starting from the ground up in an empty React project allowed me to only add features and use libraries that were necessary. Using React, I can build out what's in my head, and then very easily pare down superfluous state, renders, etc.

#### Why Redux?
Speaking of unnecessary, why did I use Redux for such a small project? Of course Redux isn't necessary all the time, and it's overkill in many cases where either React's state or small state management libraries could do the job. For this project, the only state I wanted to manage was for a few user auth actions. I found it was much cleaner and easier to have everything in a few action and reducer files, which avoids the inevitable mess that comes with sticking with React's state too long and trying to lift up the state in multiple places, as well as moving it laterally.

### Why Mongo?
Mongo is definitely useful for small, Proof of Concept applications. Just adding the URI and then simple one word `mongod` command to get a server up and running and connected to your app is undoubtedly the easiest way to connect a server. I wish setting up and connecting MySQL and PostgreSQL was as simple as a single command, but we sadly can't always get what we want.

On the other hand, becayse Mongo is a NoSQL database, you need to really think of your data beforehand. Most projects actually do require relational data, or will in the future. For the small percent of projects that don't, Mongo is a great choice. But unless you know 100% without a doubt that you will never need relations, relational databases like MySQL or PostgreSQL is very commonly the correct choice. While there are workarounds to use relations in Mongo, they're all kind of hackey; it's better to just use the right tool for the job.

That being said, for a project like this, especially one in which I'm just pulling some data from an API, Mongo is very useful.

### Styling
I used styled-components because of its extensibility, as well as the fact that the Single File Component idea compliments a smaller project such as this, even though it works well on larger projects regardless! Having few, self contained, single purpose files I believe increases maintainability (up to a certain point), and that paradigm is very much "React" anyway. Every component should just do one thing. Having the styling inside the file certainly cuts down on the number of files in the project, and when opening a file it's immediately clear what it does and what it looks like. The beauty of CSS-in-JS is that it's inherently extensible. Using globalStyle, props, theming, full scss functionality, etc, are all benefits. Styled components are great for tiny projects with a few files, to giant projects where reusing theming config variables through props, as well as conditional props, make our lives a lot easier.

## Folder structure
```bash

├── client
│   ├── Auth
│   ├── Auth # Register and Login
│   ├── Info # Info page
│   ├── Launches # Home page
│   ├── Layout # Layout container and components
│   ├── Router # App routes
│   ├── Saved # Saved page
│   ├── Shared # Components and styles shared by containers
│   ├── store # Redux directory
│   │   ├── actions # Redux actions
│   │   └── reducers # Redux reducers
│   └── utils # Various utilities,loaders, notification, etc.
├── config # Passport configuration
├── models # Mongo's collection models
├── routes # Routes for express
├── validator # User auth validation
└── server.js # Entry point for the express server
```