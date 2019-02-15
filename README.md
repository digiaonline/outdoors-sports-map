# outdoors-sports-map

Helsingin kaupungin Ulkoliikuntakartta.

## Getting started

- Install [NPM](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com)
- Clone this project
- Checkout the submodule (`git submodule update --init`)
- Run `yarn` to install dependencies
- Run `npm start` to start up the development server
- Application is now available at `localhost:5000`

On Linux `npm rebuild node-sass` might be necessary.

## Deploying

* Install Capistrano by running the following commands:

```
gem install capistrano
```

* Place the `outdoors-sports-map` private SSH key in the `cap/keys` directory. Ask your coworkers if you 
don't have the file.
* Run `cap production deploy` from the project's root directory

If you want to deploy a branch, run e.g. `BRANCH=develop cap production deploy` instead.
