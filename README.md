```
     .--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--.
    / .. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \
    \ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/ /
     \/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /
     / /\/ /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /\/ /\
    / /\ \/`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'\ \/\ \
    \ \/\ \                                                    /\ \/ /
     \/ /\ \                                                  / /\/ /
     / /\/ /               A UI for Showrunner                \ \/ /\
    / /\ \/                                                    \ \/\ \
    \ \/\ \               to make things better                /\ \/ /
     \/ /\ \                                                  / /\/ /
     / /\/ /                                                  \ \/ /\
    / /\ \/                                                    \ \/\ \
    \ \/\ \.--..--..--..--..--..--..--..--..--..--..--..--..--./\ \/ /
     \/ /\/ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ /\/ /
     / /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\
    / /\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \
    \ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `' /
     `--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'
````

## Purpose of this project

### Where to find the deployed version

Staging: http://api.staging.hackreactor.com/producer/v0/

## Tech Stack

Node/Express + AngularJS + LevelDB

## How to run this code
* `npm start`

## Development

* fork the repo
* `git clone https://github.com/hackreactor-labs/app.producer.git`
* `npm install`
* `bower install`
* `touch .env` from root directory
* update the .env file with personal Asana keys (follow instructions below)
* `nodemon`

These should be inside of the .env file:
* **ASANA_API_KEY**=YOUR_API_KEY
* **WORKSPACE_ID**=FROM_YOUR_ASANA_ACCOUNT
* **PROJECT_ID**=FROM_YOUR_ASANA_ACCOUNT
* **ROLES_ID**=FROM_YOUR_ASANA_ACCOUNT
* **ASANA_ACCESS_TOKEN**=YOUR_ACCESS_TOKEN
* **EVENTS_URL**=http://api.staging.hackreactor.com/choreographer/v0/metronome/events
* **CHOREOGRAPHER_URL**=http://api.staging.hackreactor.com/choreographer/v0
* **CHOREOGRAPHER_SECRET**=FROM_TEAMMATES
* **PORT**=8000

For local development, a Github Application will need to be registered. Follow these steps and add these additional variables to your .env file:

1. In github, go to Settings > Applications > Developer Applications > Register a new app
2. Get the client id and the client secret that are generated
3. add this as the callback url http://127.0.0.1:8000/auth/github/callback
4. add the following to your .env file

* **GITHUB_CLIENT_ID=**YOUR_CLIENT_ID
* **GITHUB_CLIENT_SECRET=**YOUR_CLIENT_SECRET
* **TEAM_NAME=**w-producer
* **ORG_NAME=**hackreactor-labs
* **GITHUB_CALLBACK_URL=**http://127.0.0.1:8000/auth/github/callback
* **USER_AGENT=**YOUR_USERNAME

For local development, a personal Asana account is needed. Once you have created an account, complete the following:
* go to your profile settings and click the 'Apps' tab
* create an API key and Personal Access Token
* create a new project; PROJECT_ID can be found in the url of the project: https://app.asana.com/0/{PROJECT_ID}/....
* create a new project to store a list of roles: ROLES_ID can be found in the url of the roles project: https://app.asana.com/0/{ROLES_ID}/....
* WORKSPACE_ID can be found here: https://app.asana.com/api/1.0/workspaces (be sure you are logged into your account)
For more detailed instructions, see the [Asana documentation](https://asana.com/developers/documentation/getting-started/auth#personal-access-token)

## How to test this code
* `npm test`

## Dependencies
dependencies
* [Node](https://nodejs.org/en/)
* [app-boot](https://www.npmjs.com/package/app-boot)
* [node-asana](https://www.npmjs.com/package/asana)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](http://expressjs.com/)
* [morgan](https://www.npmjs.com/package/morgan)
* [q](https://www.npmjs.com/package/q)
* [request](https://www.npmjs.com/package/request)
* [aws-sdk](https://www.npmjs.com/package/aws-sdk)
* [levelup](https://www.npmjs.com/package/levelup)
* [leveldown](https://www.npmjs.com/package/leveldown)
* [s3](https://www.npmjs.com/package/s3)
* [node-uuid](https://www.npmjs.com/package/node-uuid)

dev-dependencies
* [bower](http://bower.io/)
* [jasmine](https://www.npmjs.com/package/jasmine)
* [jasmine-core](https://www.npmjs.com/package/jasmine-core)
* [jasmine-node](https://www.npmjs.com/package/jasmine-node)
* [karma](https://www.npmjs.com/package/karma)
* [karma-chrome-launcher](https://www.npmjs.com/package/karma-chrome-launcher)
* [karma-jasmine](https://www.npmjs.com/package/karma-jasmine)
* [karma-phantomjs-launcher](https://www.npmjs.com/package/karma-phantomjs-launcher)
* [karma-spec-reporter](https://www.npmjs.com/package/karma-spec-reporter)
* [phantomjs](https://www.npmjs.com/package/phantom)
