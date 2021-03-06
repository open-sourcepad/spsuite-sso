// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  base_url: 'http://sso.example.com:4200',
  api_url: 'http://0.0.0.0:3000',
  google_client: '42075831752-9jf638265r2pirv7m31h141dnpf4hkas.apps.googleusercontent.com',

  Environment = {
   production: false,
   showDevModule: true,

   /** Angular debug tools in the dev console
    * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
    * @param modRef
    * @return {any}
    */
   decorateModuleRef(modRef: NgModuleRef<any>) {
     const appRef = modRef.injector.get(ApplicationRef);
     const cmpRef = appRef.components[0];

     let _ng = (<any>window).ng;
     enableDebugTools(cmpRef);
     (<any>window).ng.probe = _ng.probe;
     (<any>window).ng.coreTokens = _ng.coreTokens;
     return modRef;
   },
   ENV_PROVIDERS: [

   ]
 },
};
