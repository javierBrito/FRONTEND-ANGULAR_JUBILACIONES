// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false, 
  prefijoApp:"SJU",
  //url_seguridades: 'http://10.200.10.15/seguridades-servicios',
  url_seguridades: 'https://desacademico.educacion.gob.ec/seguridades-servicios',
  //url_seguridades: 'http://localhost:8080/seguridades-servicios',
  url_docente:'http://10.200.10.15/docentes-servicios',
  //url_jubilacion:'http://10.200.10.16:8080/jubilacion-servicios',
  url_jubilacion:'http://10.200.10.15/jubilacion-servicios',
  //url_jubilacion:'http://localhost:8080/jubilacion-servicios',
  url_registroCivil_Des:'http://10.200.10.15/registroCivil-servicios',
  url_registroCivil:'http://ws.educacion.gob.ec/serviciosExternos-web',
  url_servicio_externo:'http://10.200.2.50:8080/serviciosExternos-web',
  url_catalogo: 'https://desacademico.educacion.gob.ec/catalogo-servicios',
  //url_catalogo: 'http://10.200.10.15/catalogo-servicios',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
