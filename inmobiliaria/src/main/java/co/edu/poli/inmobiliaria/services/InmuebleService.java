package co.edu.poli.inmobiliaria.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.poli.inmobiliaria.entitys.InmuebleEntity;
import co.edu.poli.inmobiliaria.entitys.PersonaEntity;
import co.edu.poli.inmobiliaria.repository.CrudGenerico;
import co.edu.poli.inmobiliaria.repository.InmuebleRepository;

@Service
public class InmuebleService implements CrudGenerico<InmuebleEntity>{
	@Autowired
	private InmuebleRepository repository;

	@Override
	public List<InmuebleEntity> findAll() {
		return this.repository.findAll();
	}
	@Override
	public InmuebleEntity save(InmuebleEntity entity) {
		return this.repository.save(entity);
	}
	@Override
	public InmuebleEntity update(InmuebleEntity entity) {
		return this.repository.save(entity);
	}
	@Override
	public InmuebleEntity findById(Long id) {
		return this.repository.findById(id).get();
	}
	@Override
	public InmuebleEntity delete(Long id) {
		InmuebleEntity entity =this.repository.findById(id).get();
		this.repository.deleteById(id);
		return entity;
	}	
	public LinkedList<InmuebleEntity> findByName(String name){
		return this.repository.findByName(name);
	}
	
	public LinkedList<InmuebleEntity> findByPersona(Long idpersona){
		return this.repository.findByPersona(idpersona);
	}
	
	public LinkedList<InmuebleEntity> findActivos(){
		return this.repository.findActivos();
	}
	
	public LinkedList<InmuebleEntity> findByTipo(String tipo){
		return this.repository.findByTipo(tipo);
	}
}
