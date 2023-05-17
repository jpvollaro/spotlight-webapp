<div align="center">
    <img alt="uitk-boot" src=".github/opi-uitk.png" width="520px" /></br>
    <p align="center">
      Consume this repository to quickly start up a UITK project that can be ready for production quickly!
    </p>
</div>
<div align="center">
    <a href="https://reuse.optum.com">
      <img src="https://img.shields.io/badge/-reuse-blue">
    </a>
    <a href=".github/CONTRIBUTING.md">
      <img src="https://img.shields.io/badge/PRs-welcome-7abd8f.svg">
    </a>
</div>

# 
**Production Ready 📦:** Besides some basic configurations, users will be able to push their UI project out to production rapidly by consuming the boot project!

**OAuth Implementation 🔑:** OAuth login/logout ready out of the box! Just basic configurations would be needed to use login/logout functionality using UHG's MSID login pattern. 

**Optum UIToolkit embedded 🎨:** Optum's [UI Toolkit](https://uitk4.optum.com) was consumed to deliver a stream-lined and beautiful UI that complies with the [UXDS](https://hubconnect.uhg.com/groups/common-ux) stylesheet and guidelines!

## Maintainers 👥

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.optum.com/rsites"><img src="https://github.optum.com/avatars/u/171?" width="100px;" alt="Sites, Ryan"/><br /><sub><b>Ryan Sites</b></sub></a><br /><a href = "https://www.flowdock.com/app/private/269705" title="Code">💬</a></td>
    <td align="center"><a href="https://github.optum.com/rarlan2"><img src="https://github.optum.com/avatars/u/169?" width="100px;" alt="Arlandson, Rob"/><br /><sub><b>Rob Arlandson</b></sub></a><br /><a href = "https://www.flowdock.com/app/private/301000" title="Code">💬</a></td>
    <td align="center"><a href="https://github.optum.com/jay"><img src="https://github.optum.com/avatars/u/10794?" width="100px;" alt="Park, Jay"/><br /><sub><b>Jay Park</b></sub></a><br /><a href = "https://www.flowdock.com/app/private/341971" title="Code">💬</a></td>
  </tr>
</table>

## Contributing 🤝
Please refer to the [Contribution Guidelines](.github/CONTRIBUTING.md) for guidance on contributing back to `uitk-boot`!

## Table of Contents 🗄

1. [Getting Started 📓](#getting-started-)
2. [Environment Configuration 🏞](#environment-configuration-)
3. [Development Server 💻](#development-server-)
    - [Build](#build)
    - [Code Scaffolding](#code-scaffolding)
4. [Kubernetes/Helm](#Kubernetes/Helm)
    - [Steps](#Steps)
5. [Deployment Pipeline with Jenkins 🔧](#deployment-pipeline-with-jenkins-)
    - [Dockerfile](#dockerfile)
    - [Jenkinsfile](#jenkinsfile)
    - [Optumfile.yml](#optumfileyml)
    - [sonar-project.properties](#sonar-project-proerties)
    - [OpenShift Deployment](#openshift-deployment)
6. [Testing ✍️](#testing-)
    - [Running unit tests locally](#running-unit-tests-locally)
    - [Running end-to-end tests](#running-end-to-end-tests)
    - [Linting](#linting)
7. [Removing `yourapp` from your instance](#removing-yourapp-from-your-instance)
8. [Feature Toggle Setup and Implementation](#feature-toggle-setup-and-implementation)

## Getting Started 📓
### UITK Installation
UITK is hosted on our internal NPM private repository. A `.npmrc` file has been added to the source code, that includes the required repository when performing `npm install`.

### Prerequisites
The following is a list of things needed to leverage `uitk-boot`
+ NodeJS >= 6 (_included with `npm`_)
  + Windows: Comes installed with Visual Studio
    - _Ensure you install Node LTS (v10.13) and not v11 as some libraries aren't compatible with v11_
  + macOS: Install [Homebrew][brew] and then run `brew install node`
+ Angular CLI
  + Run `npm i -g @angular/cli`
Use [**Compass**][compass] to create a new UITK repository, clone the repository and navigate to its directory

```bash
git clone https://github.optum.com/you/uitk-boot.git
cd uitk-boot
```

Install dependencies:  
```bash
npm install
```
A `.npmrc` file has been added to the source code, that includes our private npm repo when performing `npm install`. _If npm installs for puppeteer and you get an error:_
- On macOS: run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal before `npm install`
- On Windows: run `set NODE_TLS_REJECT_UNAUTHORIZED=0` in cmd prompt before `npm install`  

Start local development server:
```bash
npm start
```

## Environment Configuration 🏞
There are 5 environments pre-configured in `uitk-boot`:

1. `environment.local.ts` - local environment for bypassing OIDC
2. `environment.ts` - development environment
3. `environment.test.ts` - test environment
4. `environment.stage.ts` - stage environment
5. `environment.prod.ts` - production environment

_For example..._
```node
    export const environment = {
        application_name: 'Your App Name',
        isLocal: true,
        production: false,
        navigationMode: 'side',
        weatherApi : 'http://api.openweathermap.org/data/2.5/',
        weatherApiKey : '846976aa2e9484b3cc5f36157c8fc054',
        notification : {
            position: 'relative',
            messageRole: 'alertdialog',
            closeButton: true,
            animationType: 'fadeAnimation',
            autoClose: true,
            messageVisibleTime: '10000',
            animationTime: '.5'
        },
        oauth: {
            issuer: 'https://ssoiamcorp-nonprod.uhg.com',
            loginUrl: 'https://ssoiamcorp-nonprod.uhg.com/as/authorization.oauth2',
            logoutUrl: 'logout',
            redirectUri: '<your base url>',
            silentRefreshUri: '<your base url>/silent-refresh.html',
            clientId: '<enter your client id>',
            responseType: 'id_token token',
            scope: 'openid profile address email phone',
            acr_values: 'AAL1_MS-AD-Kerberos',
            autoRefresh: true
        },
        idleTimeout: 900
    };
```

+ `applicationName` - Sets application name next to Optum Branding Logo
+ `navigationMode` - Sets application navigation mode
  + valid values: `both`, `top`, or `side`
+ alert settings - Application alert notification settings [(documentation)](http://webrd1268.uhc.com/master/demos/message/api-doc)
  + `position`
  + `messageRole`
  + `closeButton`
  + `animationType`
  + `autoClose`
  + `messageVisibleTime`
  + `animationTime`
+ OAuth settings
  + `issuer` - Optum SSO URL (base URL)
  + `loginUrl` - Optum SSO authentication endpoint
  + `logoutUrl` - Navigate to logout component
  + `redirectUri` - After authentication, the URL to redirect to with access and ID tokens
  + `silentRefreshUri` - Used for automatically refreshing access token for implicit flow
  + `clientId` - Client ID assigned to you by IAM team
  + `responseType` - OIDC response type (**do not change**)
  + `scope` - OIDC scopes (**do not change**)
  + `acr_values` - Profile assigned by IAM team
  + `autoRefresh` - Use OIDC silent refresh (**recommended**)
+ `idleTimeout` - Number of seconds before user gets automatically logged out due to inactivity

## Development Server 💻
We are using the AngularCLI, which uses lite-server under the hood. Type `npm start` for a dev server. This will call `ng serve --configuration=local -o` which will run a local environment that bypasses OIDC and opens a browser window for you. The app will automatically reload if you change any of the source files and save.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `outDir` property in the `.angular-cli.json` file. Use the `--prod` flag for a production build, or use `--configuration=<configname>` for any other environments (i.e. `--configuration=dev`).

### Code Scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Kubernetes/Helm
### Prereqs
1) Docker
1) Local Kubernetes instance
1) Helm

### Steps

1) Build angular application
```bash
ng build
```
2) Create Docker image
```bash
docker build -t angular-boot:local .
```
3) Install Helm Chart
```bash
helm install angular-boot helm/angular-boot/
```
4) Visit local k8s instance of Angular boot @ http://localhost:8080
5) Clean up
```bash
helm delete angular-boot
```

## Deployment Pipeline with Jenkins 🔧

### Dockerfile
Provided a `Dockerfile` with an example light weight nginix sample that serves static HTML, CSS, and Javascript.

1. Run `npm i && ng build --prod` to build
2. Run `docker build -t name:[tag] .` to create an image (_don't forget the `.`_)
3. Run `docker run -p 80:8080 {tagName}` to create a container based on the image
4. Go to [`http://localhost`](http://localhost) to view the application running
### Jenkinsfile
Provided a `Jenkinsfile` that uses declarative pipeline to deploy UI to Openshift within a Docker container. `Jenkins instance with JPaC configured required to use this`

### Optumfile.yml
This file is used by JPaC to capture DevOps event metrics. More can be found [here](https://github.optum.com/jenkins-pipelines/global-pipeline-library/blob/master/DEVOPS_EVENTS.md) on how to update this file.

### sonar-project.properties
In the Jenkins build pipeline, there is a Sonar Publish step.

The following line can be modified for additional exclusions:
```node
sonar.coverage.exclusions=**/*.spec.ts, **/*.module.ts, **/shared/models/**/*
```

### OpenShift Deployment
The Jenkins pipeline uses a template (`ui-deploy.yaml`) to create OpenShift resources that deploys your application.

## Testing ✍️

### Running unit tests locally
`uitk-boot` is pre-configured with [Karma](https://karma-runner.github.io) for test execution.

+ Run `ng test` to execute the unit tests via Karma
  + HTML reports are placed in `_reports` directory
+ Run `ng test --code-coverage` to include code coverage reports
  + Output is placed in `coverage` directory
    + `lcov.info` has lcov data for sonarqube
    + `index.html` is for viewing coverage results locally
+ Run `ng test --watch` will build when files change

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
e2e is using protractor-beautiful-reporter, which creates reporting output, and places by default to `/tmp/screenshots`. The configuration for this is in the `protractor.conf.js`
file.

### Linting
Run `ng lint` to run typescript linting locally. To attempt to automatically fix the linting errors, run `ng lint --fix`.

## Removing `yourapp` from your instance 

1. Delete `samples` folder from `/src/app`
2. Remove `{ path: 'yourapp', loadChildren: 'app/yourapp/yourapp.module#YourappModule'}` from `app-routing.module.ts` file
3. Remove any routes to `app` in `/src/app/shared/models/`
   1. `primary.navigation.ts`
   2. `side.navigation.ts`
```node
    {
        textTemplate: '<span>Samples</span>',
        dropDown: {
            links: [
                { textTemplate: '<span>Lazy Load</span>', url: '/app/lazyload' },
                { textTemplate: '<span>Weather Service</span>', url: '/app/weather' },
                { textTemplate: '<span>JoyRide</span>', url: '/app/joyride' }
            ],
            menuVisible: false
        }
    }
```

## Feature Toggle Setup and Implementation
UITK boot comes with the setup that will enable the user to use feature toggle in there applciation.

1. To enable Feature Toggle's for your application, Import `FeatureToggleModule` in `app.module.ts`
2. There are two ways by which feature toggle configuration can be loaded into your application. Either from `Config Files` or it can be done from `Database via Rest API`.
    - To load from Config file
        Inside Feature Module under Providers section, configuration is loaded from `loadConfiguration` factory method
       
       ```bash
       {
            provide: APP_INITIALIZER,
            useFactory: loadConfiguration,
            deps: [FeatureConfig],
            multi: true
        }
       ``` 
    - To load from Database via Rest API
        Inside Feature Module under Providers section, configuration is loaded from `loadConfigurationApi` factory method
       
       ```bash
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfigurationApi,
            deps: [FeatureConfig],
            multi: true
        }
      ```
3. Feature toggle can be used in application by three ways
    1. By `Attribute Directive` on your HTML.
        
        ```bash
        <ng-container *appFeatureToggle="'breadcrumb'">
          <uitk-breadcrumb></uitk-breadcrumb>
        </ng-container>
       ```
       
    2. By `FeatureToggleGuard`, that will only enable a route if that feature is enabled
        
        ```bash
            {
            path: 'feature-toggle',
            component: FeatureToggleComponent,
            canActivate: [AuthGuard, FeatureToggleGuard],
            data: {
                featureToggle: 'toggleInterface'
                // anyFeatureFlags: ['toggleInterface', 'breadCrumb']
                }
            }
        ```
        
    3. By injecting `FeatureToggleService` and by consuming it's methods to determine whether a fetaure is on or not.
        Methods available:
        - featureOff(featureName: string) : Determines whether a feature is off.
        - featureOn(featureName: string) : Determines whether a feature is On or not
        - anyFeatureOn(features: string[]) : Determine whether a any of the passed feature flag's are on or not.

4. There is one `FeatureToggleComponent` that is used to toggle feature flags, that is place on the global nav and sholud be       visible to users with administrative rights (upon configuration). This component shall only be used if you are loading Feature Flags from Rest API.

[rs_email]: mailto:ryan.sites@optum.com
[ra_email]: mailto:rob_arlandson@optum.com
[compass]: https://github.optum.com/paymentintegrity/compass
[brew]: https://brew.sh


localhost:4200/app/movies
IN container settup don't use local env.