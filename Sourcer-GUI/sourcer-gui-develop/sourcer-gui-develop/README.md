| Branch  | Pipeline Status                                                                                                                                                                  | Test Coverage                                                                                                                                                                    | Latest Release                                                                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| develop | [![pipeline status](https://gitlab.com/jobtarget/apps/sourcer/sourcer-gui/badges/develop/pipeline.svg)](https://gitlab.com/jobtarget/apps/sourcer/sourcer-gui/-/commits/develop) | [![coverage report](https://gitlab.com/jobtarget/apps/sourcer/sourcer-gui/badges/develop/coverage.svg)](https://gitlab.com/jobtarget/apps/sourcer/sourcer-gui/-/commits/develop) | N/A                                                                                                                                                   |
| main    | [![pipeline status](https://gitlab.com/jobtarget/apps/sourcer/sourcer-gui/badges/main/pipeline.svg)](https://gitlab.com/jobtarget/apps/sourcer/sourcer-gui/-/commits/main)       | [![coverage report](https://gitlab.com/jobtarget/apps/sourcer/sourcer-gui/badges/main/coverage.svg)](https://gitlab.com/jobtarget/apps/sourcer/sourcer-gui/-/commits/main)       | [![Latest Release](https://gitlab.com/jobtarget/devops/hello-world/-/badges/release.svg)](https://gitlab.com/jobtarget/devops/hello-world/-/releases) |

# Sourcer UI

v1.6.0

![sourcer](https://gitlab.com/jobtarget/apps/sourcer/sourcer-gui/uploads/5fbb1eb9e2a99510adb9565d3581a4ba/Screen_Shot_2023-01-20_at_3.54.19_PM.png)

| Environment | URL                                                                            |
| :---------- | :----------------------------------------------------------------------------- |
| QA          | [https://qa-sourcingui.jobtarget.com/](https://qa-sourcingui.jobtarget.com/)   |
| UAT         | [https://uat-sourcingui.jobtarget.com/](https://uat-sourcingui.jobtarget.com/) |
| Production  | [https://sourcer.jobtarget.com/](https://sourcer.jobtarget.com/)               |
| Logging     | [Datadog RUM](https://tinyurl.com/sourcer-dd-rum)                              |
| Logging     | [Datadog Trace](https://tinyurl.com/sourcer-dd-trace)                          |

## Getting Started

### Install and Setup

#### Yarn

The project uses Yarn for package management rather than npm. If you accidentally use npm you might run into some issues or conflicts so make sure that you are using Yarn when installing and adding new packages.

#### @jobtarget/ui-library

Note: This project uses a private npm repository hosted on gitlab and will need a token to access and install this library. You will first need to create a `.npmrc` file based on the `.npmrc.example` file, filling in the token value with the value found in this Gitlab repo under Settings > CICD > Variables > NPMRC_CONFIG. Once this `.npmrc` file exists you can then run `yarn install` like normal.

After cloning the repo, run `yarn install`. Once that has completed you will need to create a `.env` file in the root of the project. You will need to copy the contents of the env file on Gitlab which can be found under Settings > CICD > Variables > ENV_FILE (QA Environment).

### How To Run

#### Localhost

Once the project has been installed and the `.env` file has been created and populated, type `yarn dev` in the terminal to launch the app in the browser.

#### Docker

To create a container for this repo use this command `yarn build:docker` in the terminal and a docker image will be created.

### Running The Unit Tests

This project uses React Testing Library for the unit tests for the components and also for the custom hooks. It uses Jest for the utility function tests. To run the units tests type `yarn test` in the terminal.

## About The App

### Stack

This project uses Typescript everywhere that is currently possible. Typescript helps to catch errors before the build and keeps the component props in check. This app is Nextjs which allows us to have api routes and server-side rendering if needed.

Eslint and Prettier are also setup and used as strict as possible. Eslint is based off of the Airbnb recommended and also uses the JSX a11y plugin to help catch accessibilty issues. Prettier forces the same coding conventions and will automatically format the code based on those settings.

Husky is used as a pre-commit hook to force eslint/prettier to run before any code can be committed. This will help to ensure that no stray console.logs or other issues accidentally get pushed up to the git repo.

For styling, this project utilizes css modules via sass. This allows component level scoped styles without affecting any global styles.
