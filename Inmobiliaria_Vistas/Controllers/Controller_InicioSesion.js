angular.module('myApp', ['ui', 'ngSanitize', 'ngTable']).controller('ControlInicioSesion', function($scope, $ocLazyLoad, $rootScope, $http, General) {
		
	
	console.log($rootScope.URLactual);
	$rootScope.clase_menu = "IniciarSesion";	
	$scope.InicializarRegistro = function(){
		$scope.Registro={
			email:'',
			clave:'',
			estado:'',		
			msg_error_correo:'',
			msg_error_clave:'',
		}	
	}
	$scope.Persona={};
	
	
	$scope.IniciarSesion = function (){
		$scope.Registro.msg_error_correo ='';
		$scope.Registro.msg_error_clave ='';
		$rootScope.msg_correo = '';	
		if($scope.Registro.email==''){
			$scope.Registro.msg_error_correo = 'Ingrese su correo electrónico';
			return false;
		}	
		if($scope.Registro.clave==''){
			$scope.Registro.msg_error_clave = 'Ingrese su contraseña';
			return false;
		}
		if($rootScope.msg_correo!=''){
			return false;
		}
		

		$http( {
			method: 'GET',
			url: $rootScope.Url_Servidor+"/api/persona/loginPersona",
			headers: {
			  	'correo': $scope.Registro.email,
			 	'pass': $scope.Registro.clave,
				'Content-Type': 'application/JSON',
                'Accept-Charset': undefined
			}
		   }).then(function successCallback(response) {
			$scope.Persona=response.data[0];
			if(response.data.length>=1){
				if($scope.Persona.estado=="ACTIVO"){
					//Metodo Iniciar Sesión
					console.log($scope.Persona);
					localStorage.setItem("SesionUsuario", $scope.Persona.email);
					localStorage.setItem("SesionFecha", output3);
					localStorage.setItem("SesionEstado",  $scope.Persona.estado);
					localStorage.setItem("SesionRol",  $scope.Persona.rol);
					localStorage.setItem("SesionId",  $scope.Persona.id);
					$rootScope.InicializarSesion();
					console.log($rootScope.Sesion);
					window.location= "#!/usr_datospersonales";
				}
				else{
					swal("Advertencia", "Su usuario esta inactivo comuniquese con el administrador el sistema", "error")
				}
			}
			else{
				swal("Advertencia", "Credenciales Inocrrectas verifique el usuario y/o contraseña", "error")
			}
		  }, function errorCallback(response) {
			
		  });


		
		
	}
	
	$scope.InicializarRegistro();

	




});