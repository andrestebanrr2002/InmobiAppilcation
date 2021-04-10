package co.edu.poli.inmobiliaria.entitys;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="inmueble")
public class InmuebleEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String titulo;
	private String descripcion;	
	private Long habitaciones;
	private Long sanitarios;
	@Column(name ="fecha_creacion",columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP")
	private Date fechaCreacion;
	private Long pisos;
	private String tipo;
	private String estado;
	private String pais;
	private String departamento;
	private String ciudad;
	private String zona;
	private String sala;
	private String cocina;
	private String servicio;
	private String garaje;
	private Long precio;
	@Column(name ="metros_cuadrados")
	private Long metrosCuadrados;
	@Column(name ="id_persona")
	private Long idpersona;
}
