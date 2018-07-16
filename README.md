# SpsuiteSso

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## How to add SSO Authentication to client
 1. Copy route-guard folder to app/ of client
 2. Import AuthGuard  to app.module.ts <br />
    import {
    AuthGuard
    } from './services/route-guards'

    providers: [
    AuthGuard
    ],
    ```
 3. Inside session.ts add these functions<br />
    ```
     verifySsoToken(payload: any){
        let sign_in_url = "https://api.spsuite.co/api";
        return this.http.post(`${sign_in_url}/sso/validate_token`, payload , true);
     }
    ```
    ```
    refreshSsoToken(){
        let sign_in_url = "https://api.spsuite.co/api";
        return this.http.get(`${sign_in_url}/sso/show`);
    }
    ```
 4. Import AuthGuard and add the guard to route<br />
    ```
     example:
      {
        path: 'company-events',
        component: CompanyEventsComponent,
        canActivate: [AuthGuard] ,
      },
    ```
  5. Add this code to the nginit of every component to remove parameters after authentication<br />
    ```
    this.activeRoute.queryParams.subscribe(routeParams => {
        if(routeParams.sso!=null){
            this.location.replaceState(this.location.path().split("?")[0])
        }

        });
    }
    ```
  6. Don't forget to add headers in request
        headerParams['AccessToken'] = currentUser.access_token;
        headerParams['UserId'] = currentUser.id;
        headerParams['UserEmail'] = currentUser.email;


        ## NG6 Starter+NG CLI

        use CLI generators to generate new components/services.
        use NG6 Starter for webpack configs. (easily plug pug,scss,hmr etc.)

        ## Commands
        ```bash
        npm run server:dev
        ```
        (start server in dev mode)

        ## SCSS DRY
        ```sh
        *   modify/add global css under /styles folder
        *   manage import precedence on style.scss
        ```

        ## Add ENV variables
        ```sh
        *   modify config/config.dev.json (for dev) or config.prod.json (for prod)
        *   use var as APP_CONFIG['api_url'] (anywhere in the app, no need for extra imports)
        ```

        ## Add a new API service
        ```sh
        create service under /services/api
        update index.ts
        update app.module.ts
        import the new service
        update APP_PROVIDERS (inside app.module.ts)
        ```
        (same method on almost any other @Injectable)
        models do not need to be injected in app.module.ts because they are not @Injectable

        ## Add a new component
        example:
        ```sh
        ng g component pages/admin/users
        ```

        this will automaticable inject the new component inside admin.module.ts
        modify .angular-cli for other options


        ## Services Utils
        almost all apps use these utils; please inform @rav or @mark or @rodm if there are any bugs or modification suggestions on these utils

        ## Deployments
        run
        ```sh
        ./staging
        ```
        or
        ```sh
        ./production
        ```

        modify deploy/staging.rb for configs


        ## Docker user?
        ```sh
        docker-compose up
        ```

        ## Additional Notes
        ```sh
        *   This kit auto installs polyfills for edge and IE. You might need to uninstall these if you want to install other webpack related pollyfills.
        ```

        for more options pls visit

        https://github.com/gdi2290/angular-starter/wiki

        https://cli.angular.io
