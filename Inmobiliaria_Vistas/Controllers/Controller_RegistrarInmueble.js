angular.module('myApp', ['ui', 'ngSanitize', 'ngTable']).controller('ControlRegistrarInmuebles', function($scope, $ocLazyLoad, $rootScope, $http, General) {
	$rootScope.clase_menu = "Inmuebles";
	$rootScope.clase_submenu = "RegistrarInmueble";  
	
	$scope.InicializarRegistro = function() {
		$scope.Registro = {
			titulo:'',
			descripcion:'',
			tipo:'',
			servicio:'',
			sanitarios:'',
			habitaciones:'',
			sala:'NO',
			cocina:'NO',
			pisos:'1',
			metroscuadrados:'',
			pais:'',
			departamento:'',
			ciudad:'',
			zona:'',
			fecha_creacion: output2,
			estado:'ACTIVO',
			garaje:'NO',
			precio:'',
			idpersona : $rootScope.Sesion.id*1,
		}
	}
	$scope.Ingreso = {};

	$scope.Registrar = function() {
		

		if($scope.Registro.titulo==''||$scope.Registro.descripcion==''||
		$scope.Registro.tipo==''||$scope.Registro.servicio==''||$scope.Registro.sanitarios==''||$scope.Registro.habitaciones==''||
		$scope.Registro.habitaciones==''||$scope.Registro.sala==''||$scope.Registro.cocina==''||$scope.Registro.pisos==''
		||$scope.Registro.metroscuadrados==''||$scope.Registro.pais==''||$scope.Registro.departamento==''||$scope.Registro.ciudad==''
		||$scope.Registro.zona==''||$scope.Registro.fecha_creacion==''||$scope.Registro.estado==''||$scope.Registro.idpersona==''){
			swal("Advertencia", "Verifique los campos", "warning");
			return false;
		}
		$scope.Persona = {
			"titulo": $scope.Registro.titulo,
			"descripcion": $scope.Registro.descripcion,
			"habitaciones": $scope.Registro.habitaciones,
			"sanitarios": $scope.Registro.sanitarios,
			"fechaCreacion": $scope.Registro.fecha_creacion,			
			"pisos": $scope.Registro.pisos,
			"tipo": $scope.Registro.tipo,
			"estado": $scope.Registro.estado,
			"pais": $scope.Registro.pais,
			"departamento": $scope.Registro.departamento,
			"ciudad": $scope.Registro.ciudad,
			"zona": $scope.Registro.zona,
			"cocina": $scope.Registro.cocina,
			"sala": $scope.Registro.sala,
			"servicio": $scope.Registro.servicio,
			"metrosCuadrados": $scope.Registro.metroscuadrados,
			"garaje": $scope.Registro.garaje,
			"precio": $scope.Registro.precio,
			"idpersona": $scope.Registro.idpersona,

		};
		console.log($scope.Persona);
		$http({
			method: 'POST',
			url: 'http://localhost:8080/api/inmueble/save',
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify($scope.Persona),
			dataType: ("json")
		}).then(function successCallback(response) {
			swal("Información", "Inmueble registrado con exito", "success")
			$scope.InicializarRegistro();
		}, function errorCallback(response) {
			swal("Error", "Inmueble no registrado", "error")
		});


	}


	$rootScope.InicializarSesion(); 
	$scope.InicializarRegistro();
	$rootScope.ValidarSesion();

});