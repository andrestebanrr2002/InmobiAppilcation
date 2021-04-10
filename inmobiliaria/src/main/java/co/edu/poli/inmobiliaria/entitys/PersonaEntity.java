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
@Table(name="persona")
public class PersonaEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String nombres;
	private String apellidos;
	@Column(name = "correo", unique=true)
	private String email;
	private String password;
	@Column(name ="fecha_creacion",columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP")
	private Date fechaCreacion;
	private String rol;
	@Column(name="fecha_nacimiento",columnDefinition="DATE")
	private Date fechaNacimiento;
	private String estado;
}
