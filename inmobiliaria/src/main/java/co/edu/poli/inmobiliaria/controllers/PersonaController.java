package co.edu.poli.inmobiliaria.controllers;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.poli.inmobiliaria.entitys.PersonaEntity;
import co.edu.poli.inmobiliaria.repository.CrudGenerico;
import co.edu.poli.inmobiliaria.repository.PersonaRepository;
import co.edu.poli.inmobiliaria.services.PersonaService;

@RestController
@CrossOrigin (origins = "http://localhost:5500")
@RequestMapping(value = "/api/persona")
public class PersonaController {

	@Autowired
	private PersonaService servicio;
	
	@GetMapping("/findAll")
	public List<PersonaEntity> findAll() {
		return this.servicio.findAll();
	}

	@GetMapping("/findById")
	public PersonaEntity findById(@RequestHeader Long id) {
		return this.servicio.findById(id);
	}

	@GetMapping("/findByName")
	public LinkedList<PersonaEntity> findByName(@RequestHeader String name) {
		return this.servicio.findByName(name);
	}
	
	@GetMapping("/loginPersona")
	public LinkedList<PersonaEntity> loginPersona(@RequestHeader String correo, @RequestHeader String pass) {
		return this.servicio.loginPersona(correo, pass);
	}

	@PostMapping("/save")
	public PersonaEntity save(@RequestBody PersonaEntity entity) {
		return this.servicio.save(entity);
	}

	@PutMapping("/edit")
	public PersonaEntity edit(@RequestBody PersonaEntity entity) {	
		return this.servicio.save(entity);
	}

	@DeleteMapping("/delete/{id}")
	public PersonaEntity delete(@PathVariable("id") Long id) {
		PersonaEntity entity = this.servicio.findById(id);
		this.servicio.delete(id);
		return entity;

	}
}
