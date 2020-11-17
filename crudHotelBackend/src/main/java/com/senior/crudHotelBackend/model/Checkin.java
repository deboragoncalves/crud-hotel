package com.senior.crudHotelBackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="checkin")
public class Checkin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_checkin")
	private Long idCheckin;
	
	@Column(name="date_in")
	private String dateIn;
	
	@Column(name="date_out")
	private String dateOut;
	
	@Column(name="plus_car")
	private boolean plusCar;
	
	@OneToOne(targetEntity=Guest.class)
	@JoinColumn(name="id_guest")
	@JsonProperty("guest")
	private Guest guest;
	
	public Checkin() {
		
	}
	
	public Checkin(Long idCheckin, String dateIn, String dateOut, boolean plusCar) {
		this.idCheckin = idCheckin;
		this.dateIn = dateIn;
		this.dateOut = dateOut;
		this.plusCar = plusCar;
	}
	
	public Long getId() {
		return this.idCheckin;
	}
	
	public void setId(Long idCheckin) {
		this.idCheckin = idCheckin;
	}

	public String getDateIn() {
		return this.dateIn;
	}

	public void setDateIn(String dateIn) {
		this.dateIn = dateIn;
	}

	public String getDateOut() {
		return this.dateOut;
	}

	public void setDateOut(String dateOut) {
		this.dateOut = dateOut;
	}

	public boolean getPlusCar() {
		return this.plusCar;
	}

	public void setPlusCar(boolean plusCar) {
		this.plusCar = plusCar;
	}

	

	
}
