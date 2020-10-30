package com.senior.crudHotelBackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="person")
public class Hospede {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_person")
	private Long id;
	private String nome;
	private String documento;
	private String telefone;
	
	public Hospede() {
		
	}
	
	public Hospede(Long id, String nome, String documento, String telefone) {
		this.id = id;
		this.nome = nome;
		this.documento = documento;
		this.telefone = telefone;
	}
	
	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	
	
}
