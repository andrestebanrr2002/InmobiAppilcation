angular.module('myApp', ['ui', 'ngSanitize', 'ngTable']).controller('ControlInmueblesPropios', function($scope, $ocLazyLoad, $rootScope, $http, General) {
	$rootScope.clase_menu = "Inmuebles";
	$rootScope.clase_submenu = "InmueblesPropios";  
	
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
	$scope.InmueblesPropios = {};

	$scope.MisInmuebles = function(){
		$http( {
			method: 'GET',
			url: $rootScope.Url_Servidor+"/api/inmueble/findByPersona",
			headers: {
			  	'idpersona': $scope.Registro.idpersona,
				'Content-Type': 'application/JSON',
                'Accept-Charset': undefined
			}
		   }).then(function successCallback(response) {              
			    var data =response.data;
				$scope.InmueblesPropios = data; 
                console.log($scope.InmueblesPropios);								
			
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
				$scope.Registro.fecha_creacion = data.fechaCreacion;
				$scope.Registro.estado = data.estado;
				$scope.Registro.garaje = data.garaje;
				$scope.Registro.precio = data.precio;							
			
            }, function errorCallback(response) {
                
            });
	}
	$scope.ActualizarInmueble = function(){
		$scope.Inmueble={};
		if($scope.Registro.titulo==''||$scope.Registro.descripcion==''||
		$scope.Registro.tipo==''||$scope.Registro.servicio==''||$scope.Registro.sanitarios==''||$scope.Registro.habitaciones==''||
		$scope.Registro.habitaciones==''||$scope.Registro.sala==''||$scope.Registro.cocina==''||$scope.Registro.pisos==''
		||$scope.Registro.metroscuadrados==''||$scope.Registro.pais==''||$scope.Registro.departamento==''||$scope.Registro.ciudad==''
		||$scope.Registro.zona==''||$scope.Registro.fecha_creacion==''||$scope.Registro.estado==''||$scope.Registro.idpersona==''){
			swal("Advertencia", "Verifique los campos", "warning");
			return false;
		}
		$scope.Inmueble = {
			"id": $scope.Registro.id,
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

		$http({
			method: 'PUT',
			url: 'http://localhost:8080/api/inmueble/edit',
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify($scope.Inmueble),
			dataType: ("json")
		}).then(function successCallback(response) {
			swal("Información", "Inmueble Actualizado con exito", "success")
			$scope.InicializarRegistro();
			$scope.MisInmuebles();
			$("#ActModal").modal("hide");
		}, function errorCallback(response) {
			swal("Error", "Inmueble no actualizados", "error")
		});
	}

	$scope.EliminarInmueble = function(id){
		swal({
            title: "Advertencia",
            text: "¿Desea Eliminar el inmueble?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: false, 
          })
          .then((willDelete) => {
            if (willDelete) {
                $http({
					method: 'DELETE',
					url: 'http://localhost:8080/api/inmueble/delete/'+id,
					headers: {
						"Content-Type": "application/json"
					},
					dataType: ("json")
				}).then(function successCallback(response) {
					swal("Información", "Inmueble Eliminado con exito", "success")
					$scope.InicializarRegistro();
					$scope.MisInmuebles();
					$("#ActModal").modal("hide");
				}, function errorCallback(response) {
					swal("Error", "Inmueble no eliminado", "error")
				});                              
            }
        });
	}


	
	$rootScope.InicializarSesion(); 
	$scope.InicializarRegistro();
	$rootScope.ValidarSesion();
	$scope.MisInmuebles();

});