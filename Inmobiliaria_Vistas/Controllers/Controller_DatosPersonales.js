angular.module('myApp', ['ui', 'ngSanitize', 'ngTable']).controller('ControlDatosPersonales', function ($scope, $ocLazyLoad, $http, $rootScope) {	
	$rootScope.clase_submenu = "DatosPersonales";  
	$rootScope.clase_menu = "";

    $scope.InicializarRegistro = function() {
		$scope.Registro = {
            id: $rootScope.Sesion.id*1,
			p_nombre: '',
			s_nombre: '',
			p_apellido:'',
			s_apellido:'',
			fecha_nacimiento:{
				value: null,
				id:''
			},
			email: '',
			clave: '',
			clave_act:'',
			nue_clave:'',
			conf_clave: '',
			rol:'CLIENTE',
			estado:'ACTIVO',
			fecha_creacion:'',
		}
	}
	$scope.formclave='false';

    $scope.DatosPersonales = function(){
        $http( {
			method: 'GET',
			url: $rootScope.Url_Servidor+"/api/persona/findById",
			headers: {
			  	'id': $scope.Registro.id,
				'Content-Type': 'application/JSON',
                'Accept-Charset': undefined
			}
		   }).then(function successCallback(response) {              
			    var data =response.data;
                $scope.Registro.id = data.id;
                $scope.Registro.nombres = data.nombres;
				$scope.Registro.apellidos = data.apellidos;
				$scope.Registro.fecha_nacimiento.value = new Date(data.fechaNacimiento);
                $scope.Registro.fecha_nacimiento.id = $rootScope.Obtener_Fecha($scope.Registro.fecha_nacimiento.value);
				$scope.Registro.clave = data.password;
				$scope.Registro.rol = data.rol;
				$scope.Registro.estado = data.estado;
				$scope.Registro.fecha_creacion = data.fechaCreacion;
				$scope.Registro.email = data.email;

                
                console.log($scope.Registro);								
			
            }, function errorCallback(response) {
                
            });
    }

	$scope.ActualizarDatos = function(){
		if($scope.Registro.nombres==''||$scope.Registro.apellidos==''||$scope.Registro.fecha_nacimiento.id==''||$scope.Registro.email==''||$rootScope.msg_correo!=''){
			swal("Advertencia", "Verifique los campos", "warning");
			return false;
		}
		if($scope.formclave=='true'){
			if($scope.Registro.clave_act==''||$scope.Registro.nue_clave==''||$scope.Registro.conf_clave==''||$scope.Registro.conf_clave!=$scope.Registro.nue_clave){
				swal("Advertencia", "Verifique los campos", "warning");
				return false;
			}		
			if($scope.Registro.clave_act == $scope.Registro.clave)	{
				$scope.Persona = {
					"id": $scope.Registro.id,
					"nombres": $scope.Registro.nombres,
					"apellidos": $scope.Registro.apellidos,
					"email": $scope.Registro.email,
					"password": $scope.Registro.nue_clave,
					"rol": $scope.Registro.rol,
					"fechaNacimiento": $scope.Registro.fecha_nacimiento.id,
					"fechaCreacion": $scope.Registro.fecha_creacion,
					"estado": $scope.Registro.estado					
				};
			}
			else{
				swal("Advertencia", "La contraseña actual es incorrecta", "warning");
				return false;
			}
		}
		else{
			$scope.Persona = {
				"id": $scope.Registro.id,
				"nombres": $scope.Registro.nombres,
				"apellidos": $scope.Registro.apellidos,
				"email": $scope.Registro.email,
				"password": $scope.Registro.clave,
				"rol": $scope.Registro.rol,
				"fechaNacimiento": $scope.Registro.fecha_nacimiento.id,
				"fechaCreacion": $scope.Registro.fecha_creacion,
				"estado": $scope.Registro.estado
			};
		}
		$http({
			method: 'PUT',
			url: 'http://localhost:8080/api/persona/edit',
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify($scope.Persona),
			dataType: ("json")
		}).then(function successCallback(response) {
			swal("Información", "Datos Actualizados con exito", "success")
			$scope.InicializarRegistro();
			$scope.DatosPersonales();
			$scope.formclave='false';
		}, function errorCallback(response) {
			swal("Error", "Datos no actualizados", "error")
		});
		
	}


    $rootScope.InicializarSesion(); 
    console.log($rootScope.Sesion)
    $rootScope.ValidarSesion();
    $scope.InicializarRegistro();
    $scope.DatosPersonales();
});