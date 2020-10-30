package com.senior.crudHotelBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senior.crudHotelBackend.model.Checkin;
import com.senior.crudHotelBackend.model.Hospede;
import com.senior.crudHotelBackend.repository.CheckinRepository;
import com.senior.crudHotelBackend.repository.HospedeRepository;

@RestController
@RequestMapping("/api/v1/")
public class HotelController {
	
	@Autowired
	private HospedeRepository hospedeRepository;
	
	@Autowired
	private CheckinRepository checkinRepository;
	
	// Get
	
	@GetMapping("/hospedes")
	public List<Hospede> getAllPeople() {
		return hospedeRepository.findAll();
	}
	
	@GetMapping("/checkin")
	public List<Checkin> getAllCheckin() {
		return checkinRepository.findAll();
	}


}
