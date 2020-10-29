package com.senior.crudHotelBackend.personModel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="person")

public class personModel {
	
	@Column(name="name")
	private String nome;
	
	@Column(name="document")
	private String documento;
	
	@Column(name="phone")
	private String telefone;
	
	public personModel() {
		
	}
	
	public personModel(String nome, String documento, String telefone) {
		this.nome = nome;
		this.documento = documento;
		this.telefone = telefone;
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
