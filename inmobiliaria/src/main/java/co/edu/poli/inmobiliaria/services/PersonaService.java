package co.edu.poli.inmobiliaria.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.poli.inmobiliaria.entitys.PersonaEntity;
import co.edu.poli.inmobiliaria.repository.CrudGenerico;
import co.edu.poli.inmobiliaria.repository.PersonaRepository;

@Service
public class PersonaService implements CrudGenerico<PersonaEntity> {

	@Autowired
	private PersonaRepository repository;

	@Override
	public List<PersonaEntity> findAll() {
		return this.repository.findAll();
	}

	@Override
	public PersonaEntity save(PersonaEntity entity) {
		return this.repository.save(entity);
	}

	@Override
	public PersonaEntity update(PersonaEntity entity) {
		return this.repository.save(entity);
	}

	@Override
	public PersonaEntity findById(Long id) {
		return this.repository.findById(id).get();
	}

	@Override
	public PersonaEntity delete(Long id) {
		PersonaEntity entity =this.repository.findById(id).get();
		this.repository.deleteById(id);
		return entity;
	}
	
	public LinkedList<PersonaEntity> findByName(String name){
		return this.repository.findByName(name);
	}
	

	public LinkedList<PersonaEntity> loginPersona(String correo, String pass){
		return this.repository.loginPersona(correo, pass);
	}

}
