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

Node/Express + AngularJS

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
ASANA_API_KEY=<your personal key>
WORKSPACE_ID=<from your Asana project>
PROJECT_ID=<from your Asana project>
ROLES_ID=<from your Asana project>
ASANA_ACCESS_TOKEN=<your personal token>
EVENTS_URL=http://api.staging.hackreactor.com/choreographer/v0/metronome/events
CHOREOGRAPHER_URL=http://api.staging.hackreactor.com/choreographer/v0
PORT=8000

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

dev-dependencies
* [bower](http://bower.io/)
* [jasmine](https://www.npmjs.com/package/jasmine) <-- command line jasmine
* [jasmine-core](https://www.npmjs.com/package/jasmine-core) <-- official packaging of jasmine's core files for use by Node.js
* [jasmine-node](https://www.npmjs.com/package/jasmine-node) *** may not need this
* [karma](https://www.npmjs.com/package/karma)
* [karma-chrome-launcher](https://www.npmjs.com/package/karma-chrome-launcher) *** may not need this
* [karma-jasmine](https://www.npmjs.com/package/karma-jasmine)
* [karma-phantomjs-launcher](https://www.npmjs.com/package/karma-phantomjs-launcher)
* [karma-spec-reporter](https://www.npmjs.com/package/karma-spec-reporter)
* [phantomjs](https://www.npmjs.com/package/phantom)
