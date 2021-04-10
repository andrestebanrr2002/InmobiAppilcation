package co.edu.poli.inmobiliaria.repository;

import java.util.LinkedList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import co.edu.poli.inmobiliaria.entitys.InmuebleEntity;
import co.edu.poli.inmobiliaria.entitys.PersonaEntity;

public interface InmuebleRepository extends JpaRepository<InmuebleEntity, Long> {
	
	@Query("Select p from InmuebleEntity p where nombres LIKE ?1")
	LinkedList<InmuebleEntity> findByName(String name);
	
	@Query("Select p from InmuebleEntity p where idpersona = ?1 ")
	LinkedList<InmuebleEntity> findByPersona(Long idpersona);
	
	@Query("Select p from InmuebleEntity p where estado = 'ACTIVO'")
	LinkedList<InmuebleEntity> findActivos();
	
	@Query("Select p from InmuebleEntity p where tipo = ?1 and estado = 'ACTIVO'")
	LinkedList<InmuebleEntity> findByTipo(String tipo);

}