package com.senior.crudHotelBackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="guest")
public class Guest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_guest")
	private Long idGuest;
	private String name;
	private String document;
	private String phone;
	
	public Guest() {
		
	}
	
	public Guest(Long idGuest, String name, String document, String phone) {
		this.idGuest = idGuest;
		this.name = name;
		this.document = document;
		this.phone = phone;
	}
	
	public Long getId() {
		return this.idGuest;
	}
	
	public void setId(Long idGuest) {
		this.idGuest = idGuest;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDocument() {
		return this.document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	
}
