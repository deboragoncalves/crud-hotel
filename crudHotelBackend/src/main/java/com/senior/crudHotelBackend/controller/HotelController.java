package com.senior.crudHotelBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.senior.crudHotelBackend.model.Checkin;
import com.senior.crudHotelBackend.model.Hospede;
import com.senior.crudHotelBackend.repository.CheckinRepository;
import com.senior.crudHotelBackend.repository.HospedeRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class HotelController {
	
	@Autowired
	private HospedeRepository hospedeRepository;
	
	@Autowired
	private CheckinRepository checkinRepository;
	
	// Get
	
	@GetMapping("/hospedes")
	public List<Hospede> getAllGuests() {
		return hospedeRepository.findAll();
	}
	
	@GetMapping("/checkin")
	public List<Checkin> getAllCheckin() {
		return checkinRepository.findAll();
	}
	
	@GetMapping("/hospedes/{documento}")
	public @ResponseBody Hospede getGuestByDocument(@PathVariable("documento") String documento) {
	    return hospedeRepository.findByDocumento(documento);
	}
	
	@GetMapping("/checkin/{id}")
	public ResponseEntity<Checkin> getCheckinById(@PathVariable Long id, Checkin checkinFind) {
		Checkin checkin = checkinRepository.findById(id).orElse(null);
		
		if (checkin == null) {
			return ResponseEntity.notFound().build();
		}
		
		checkinRepository.save(checkin);
		
		return ResponseEntity.ok(checkin);
	}

	// Post
	
	@PostMapping("/hospedes/post")
	public Hospede createGuest(@RequestBody Hospede hospede) {
		return hospedeRepository.save(hospede);
	}
	
	@PostMapping(value="/checkin/post")
	public Checkin createCheckin(@RequestBody Checkin checkin) {
		return checkinRepository.save(checkin);
	}
	
	// Patch
	
	@PatchMapping(value="/checkin/patch/{id}")
	public ResponseEntity<Checkin> updateCheckinDateOut(@PathVariable Long id, Checkin checkinUpdate) {
		Checkin checkin = checkinRepository.findById(id).orElse(null);
		
		if (checkin == null) {
			return ResponseEntity.notFound().build();
		}
		
		checkin.setDataSaida(checkinUpdate.getDataSaida());
		
		checkinRepository.save(checkin);
		
		return ResponseEntity.ok(checkin);
				
	}
	
	// Put
	
	@PutMapping(value="/checkin/put/{id}")
	public @ResponseBody ResponseEntity<Checkin> updateCheckin(@PathVariable Long id, Checkin checkinUpdate) {
		Checkin checkin = checkinRepository.findById(id).orElse(null);
		
		if (checkin == null) {
			return ResponseEntity.notFound().build();
		}
		
		checkin.setAdicionalVeiculo(checkinUpdate.isAdicionalVeiculo());
		checkin.setDataEntrada(checkinUpdate.getDataEntrada());
		checkin.setDataSaida(checkinUpdate.getDataSaida());
		
		checkinRepository.save(checkin);
		return ResponseEntity.ok(checkin);
				
	}
}
