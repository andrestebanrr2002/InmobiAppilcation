
var AppAngular = angular.module('MyApp', ['ui.router', 'oc.lazyLoad', 'ui.bootstrap', 'ngSanitize', 'ngTable', 'ui']);
var shutter = null;

d = new Date();
month = d.getMonth() + 1;
day = d.getDate();
minutos = d.getMinutes();
horas = d.getHours();
segundos = d.getSeconds();
minisegundos = d.getMilliseconds();

var output2 = d.getFullYear() + '-' +
    (month < 10 ? '0' : '') + month + '-' +
    (day < 10 ? '0' : '') + day;

    var output3 =  output2 + " "+horas+":"+minutos+":"+segundos;
AppAngular.controller('Principal', function ($scope, $rootScope, General) {	
	$rootScope.URLactual = jQuery(location).attr('href').split("/Views")[0]+"/";
	console.log("Controller General Start");
	
	$rootScope.clase_menu = "";    
    $rootScope.clase_submenu = "";  
    $rootScope.Url_Servidor = "http://localhost:8080";
	$rootScope.msg_correo = "";
    $rootScope.InicializarSesion = function(){
        $rootScope.Sesion = {
            user: localStorage.getItem("SesionUsuario"),
            fechasesion: localStorage.getItem("SesionFecha"),
            estado: localStorage.getItem("SesionEstado"),
            rol: localStorage.getItem("SesionRol"),
            id: localStorage.getItem("SesionId"),
        };
    }

	
	$rootScope.ValidarCorreo = function(campo) {
		$rootScope.msg_correo = "";	        
	    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
	    if (emailRegex.test(campo.value)) {
	      $rootScope.msg_correo = "";
	    } else {
	      $rootScope.msg_correo = "Correo inválido utilice el formato <b><i>ejemplo@ejemplo@.com</i></b>"; 
		}		
	}
	$rootScope.Obtener_Fecha = function (fecha) {
        fecha = new Date(fecha);
        if (fecha) {
            var month = fecha.getMonth() + 1;
            var day = fecha.getDate();
            var resultado = fecha.getFullYear() + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (day < 10 ? '0' : '') + day;
            return resultado;
        } else {
            return "";
        }
    }
    $rootScope.CerrarSesion = function(){
        
        $rootScope.InicializarSesion();
        swal({
            title: "Advertencia",
            text: "¿Desea cerrar sesión?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: false, 
          })
          .then((willDelete) => {
            if (willDelete) {
                
                localStorage.removeItem("SesionUsuario");
                localStorage.removeItem("SesionFecha");
                localStorage.removeItem("SesionEstado");
                localStorage.removeItem("SesionRol");
                localStorage.removeItem("SesionId");
                swal("¡Sesión Cerrada!", {
                    icon: "success",
                });
                window.location= "#!/home";
                $rootScope.InicializarSesion();
            }
        });
    }
    $rootScope.ValidarSesion= function(){
        $rootScope.InicializarSesion();
        if(!$rootScope.Sesion.user){
            swal("Advertencia", "Debe Iniciar Sesion", "warning")
            window.location= "#!/iniciarsesion";
        }
    }

    $rootScope.Formato_Dinero = function(number){
        var formatoPeso = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(number);
        return formatoPeso;
    }

}).service('General', function ($rootScope, $http, $q) {
    this.LlamarAjax = function (controlador, parametros, json) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: $rootScope.URLactual +controlador,
            headers: {
                parametros
            },
            dataType: (json == 0 ? "html" : "json")
        }).then(function successCallback(data) {
            deferred.resolve((json == 0 ? $.trim(data.data) : data.data));
        }, function errorCallback(response) {
           	console.log(response.statusText);
        });
        return deferred.promise;
    };
});