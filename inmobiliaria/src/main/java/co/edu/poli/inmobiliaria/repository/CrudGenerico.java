package co.edu.poli.inmobiliaria.repository;

import java.util.List;

public interface CrudGenerico<T> {

	List<T> findAll();

	T save(T entity);

	T update(T entity);

	T findById(Long id);

	T delete(Long id);
}
