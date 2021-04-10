package co.edu.poli.inmobiliaria.repository;

import java.util.LinkedList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import co.edu.poli.inmobiliaria.entitys.PersonaEntity;

public interface PersonaRepository extends JpaRepository<PersonaEntity, Long> {
	
	@Query("Select p from PersonaEntity p where nombres LIKE ?1")
	LinkedList<PersonaEntity> findByName(String name);
	
	@Query("Select p from PersonaEntity p where correo = ?1 and password = ?2")
	LinkedList<PersonaEntity> loginPersona(String correo, String pass);

}
