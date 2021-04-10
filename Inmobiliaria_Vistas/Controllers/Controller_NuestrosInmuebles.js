angular.module('myApp', ['ui', 'ngSanitize', 'ngTable']).controller('ControlNuestrosInmuebles', function($scope, $ocLazyLoad, $rootScope, $http, General) {
	$rootScope.clase_menu = "NInmuebles";
	
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
	$scope.Inmuebles = {};

	$scope.NuestrosInmuebles = function(){
		$http( {
			method: 'GET',
			url: $rootScope.Url_Servidor+"/api/inmueble/findActivos",
			headers: {
				'Content-Type': 'application/JSON',
                'Accept-Charset': undefined
			}
		   }).then(function successCallback(response) {              
			    var data =response.data;
				$scope.Inmuebles = data; 
                console.log($scope.Inmuebles);								
			
            }, function errorCallback(response) {
                
            });
	}

	$scope.ObtenerInmueble = function(id){
		$http( {
			method: 'GET',
			url: $rootScope.Url_Servidor+"/api/inmueble/findById",
			headers: {
			  	'id': id,
				'Content-Type': 'application/JSON',
                'Accept-Charset': undefined
			}
		   }).then(function successCallback(response) {              
			    var data =response.data;
                $scope.Registro.id = data.id;
				$scope.Registro.titulo = data.titulo;
				$scope.Registro.descripcion = data.descripcion;
				$scope.Registro.tipo = data.tipo;
				$scope.Registro.servicio = data.servicio;
				$scope.Registro.sanitarios = data.sanitarios.toString();
				$scope.Registro.habitaciones = data.habitaciones.toString();
				$scope.Registro.sala = data.sala;
				$scope.Registro.cocina = data.cocina;
				$scope.Registro.pisos = data.pisos.toString();
				$scope.Registro.metroscuadrados = data.metrosCuadrados;
				$scope.Registro.pais = data.pais;
				$scope.Registro.departamento = data.departamento;
				$scope.Registro.ciudad = data.ciudad;
				$scope.Registro.zona = data.zona;
				$scope.Registro.fecha_creacion = data.fecha_creacion;
				$scope.Registro.estado = data.estado;
				$scope.Registro.garaje = data.garaje;
				$scope.Registro.precio = data.precio;							
			
            }, function errorCallback(response) {
                
            });
	}

	$scope.BuscarInmuebles = function(){
		if($scope.Registro.tipo ==''){
			$scope.NuestrosInmuebles();
		}
		else{
			$http( {
				method: 'GET',
				url: $rootScope.Url_Servidor+"/api/inmueble/findByTipo",
				headers: {
					'tipo': $scope.Registro.tipo,
					'Content-Type': 'application/JSON',
					'Accept-Charset': undefined
				}
			   }).then(function successCallback(response) {              
					var data =response.data;
					$scope.Inmuebles = data; 
					console.log($scope.Inmuebles);								
				
				}, function errorCallback(response) {
					
				});
		}

	}
	


	
	$rootScope.InicializarSesion(); 
	$scope.InicializarRegistro();
	$rootScope.ValidarSesion();
	$scope.NuestrosInmuebles();

});