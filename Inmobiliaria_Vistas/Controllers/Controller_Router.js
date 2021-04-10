 AppAngular.config(function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {	
    $urlRouterProvider.otherwise("/home");
	$locationProvider.hashPrefix('!');

    $stateProvider
        .state('/home', {
            url: "/home",
            views: {
                "lazyLoadView": {
                    controller: 'ControlHome', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: "../home/home.html",
                }
            },
            resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('../../Controllers/Controller_Home.js');
                }]
            }
        }).state('/iniciarsesion', {
            url: "/iniciarsesion",
            views: {
                "lazyLoadView": {
                    controller: 'ControlInicioSesion', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: "../login/login.html",
                }
            },
            resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('../../Controllers/Controller_InicioSesion.js');
                }]
            }
        }).state('/per_registrar', {
            url: "/per_registrar",
            views: {
                "lazyLoadView": {
                    controller: 'ControlRegistroPersona', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: "../persona/save_persona.html",
                }
            },
            resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('../../Controllers/Controller_RegistrarPersona.js');
                }]
            }
        }).state('/usr_datospersonales', {
            url: "/usr_datospersonales",
            views: {
                "lazyLoadView": {
                    controller: 'ControlDatosPersonales', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: "../persona/datospersonales.html",
                }
            },
            resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('../../Controllers/Controller_DatosPersonales.js');
                }]
            }
        }).state('/inm_registrar', {
            url: "/inm_registrar",
            views: {
                "lazyLoadView": {
                    controller: 'ControlRegistrarInmuebles', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: "../inmueble/save_inmueble.html",
                }
            },
            resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('../../Controllers/Controller_RegistrarInmueble.js');
                }]
            }
        }).state('/inm_propios', {
            url: "/inm_propios",
            views: {
                "lazyLoadView": {
                    controller: 'ControlInmueblesPropios', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: "../inmueble/inmuebles_propios.html",
                }
            },
            resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('../../Controllers/Controller_InmueblesPropios.js');
                }]
            }
        }).state('/nuestros_inmuebles', {
            url: "/nuestros_inmuebles",
            views: {
                "lazyLoadView": {
                    controller: 'ControlNuestrosInmuebles', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: "../inmueble/nuestros_inmuebles.html",
                }
            },
            resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('../../Controllers/Controller_NuestrosInmuebles.js');
                }]
            }
        });
            
 	$locationProvider.html5Mode(false);	
    $httpProvider.defaults.withCredentials = true;
});


 
	