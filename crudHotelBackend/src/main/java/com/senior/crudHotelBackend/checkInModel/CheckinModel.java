package com.senior.crudHotelBackend.checkInModel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="checkin")

public class CheckinModel {
	
	@Column(name="person")
	private Object hospede;
	
	@Column(name="dateIn")
	private String dataEntrada;
	
	@Column(name="dateOut")
	private String dataSaida;
	
	@Column(name="haveCar")
	private boolean adicionalVeiculo;
	
	public CheckinModel() {
		
	}
	
	public CheckinModel(Object hospede, String dataEntrada, String dataSaida, boolean adicionalVeiculo) {
		this.hospede = hospede;
		this.dataEntrada = dataEntrada;
		this.dataSaida = dataSaida;
		this.adicionalVeiculo = adicionalVeiculo;
	}

	public Object getHospede() {
		return hospede;
	}

	public void setHospede(Object hospede) {
		this.hospede = hospede;
	}

	public String getDataEntrada() {
		return dataEntrada;
	}

	public void setDataEntrada(String dataEntrada) {
		this.dataEntrada = dataEntrada;
	}

	public String getDataSaida() {
		return dataSaida;
	}

	public void setDataSaida(String dataSaida) {
		this.dataSaida = dataSaida;
	}

	public boolean isAdicionalVeiculo() {
		return adicionalVeiculo;
	}

	public void setAdicionalVeiculo(boolean adicionalVeiculo) {
		this.adicionalVeiculo = adicionalVeiculo;
	}
	
	
	
	
}
