# ARCHIVED

Please use https://github.com/City-of-Helsinki/outdoors-sports-map instead

# outdoors-sports-map

Helsingin kaupungin Ulkoliikuntakartta.

## Getting started

- Install [NPM](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com)
- Clone this project
- Run `yarn` to install dependencies
- Run `yarn start` to start up the development server

The application is now available at http://localhost:5000/

## Deploying

* Install Capistrano by running the following commands:

```
gem install capistrano
```

* Place the `outdoors-sports-map` private SSH key in the `cap/keys` directory. Ask your coworkers if you 
don't have the file.
* Run `cap production deploy` from the project's root directory

If you want to deploy a branch, run e.g. `BRANCH=develop cap production deploy` instead.
