angular.module('myApp', ['ui', 'ngSanitize', 'ngTable']).controller('ControlRegistroPersona', function($scope, $ocLazyLoad, $rootScope, $http, General) {

	$rootScope.clase_menu = "Registros";
	$scope.InicializarRegistro = function() {
		$scope.Registro = {
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
			conf_clave: '',
			rol:'CLIENTE',
			estado:'ACTIVO'
		}
	}
	$scope.Ingreso = {};

	$scope.Registrar = function() {
		

		if($scope.Registro.p_nombre==''||$scope.Registro.p_apellido==''||$scope.Registro.s_apellido==''||$scope.Registro.fecha_nacimiento.id==''||$scope.Registro.email==''||$scope.Registro.clave==''||$scope.Registro.conf_clave==''||$rootScope.msg_correo!=''||$scope.Registro.clave!=$scope.Registro.conf_clave){
			swal("Advertencia", "Verifique los campos", "warning");
			return false;
		}
		$scope.Persona = {
			"nombres": $scope.Registro.p_nombre+" "+$scope.Registro.s_nombre,
			"apellidos": $scope.Registro.p_apellido+ " "+ $scope.Registro.s_apellido,
			"email": $scope.Registro.email,
			"password": $scope.Registro.clave,
			"rol": $scope.Registro.rol,
			"fechaNacimiento": $scope.Registro.fecha_nacimiento.id,
			"fechaCreacion": output2,
			"estado": $scope.Registro.estado
		};
		$http({
			method: 'POST',
			url: 'http://localhost:8080/api/persona/save',
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify($scope.Persona),
			dataType: ("json")
		}).then(function successCallback(response) {
			swal("Información", "Usuario registrado con exito", "success")
			$scope.InicializarRegistro();
		}, function errorCallback(response) {
			swal("Error", "Usuario no registrado", "error")
		});


	}


	$scope.InicializarRegistro();

});