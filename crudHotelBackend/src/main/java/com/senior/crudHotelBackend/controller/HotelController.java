package com.senior.crudHotelBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@GetMapping("/guests")
	public List<Hospede> getAllGuests() {
		return hospedeRepository.findAll();
	}
	
	@GetMapping("/checkin")
	public List<Checkin> getAllCheckin() {
		return checkinRepository.findAll();
	}
	
	@GetMapping("/guests/{id}")
	public ResponseEntity<Hospede> getGuestsById(@PathVariable Long id, Hospede guestFind) {
		Hospede guest = hospedeRepository.findById(id).orElse(null);
		
		if (guest == null) {
			return ResponseEntity.notFound().build();
		}
		
		Hospede getGuest = hospedeRepository.save(guest);
		
		return ResponseEntity.ok(getGuest);
	}
	
	@GetMapping("/checkin/{id}")
	public ResponseEntity<Checkin> getCheckinById(@PathVariable Long id, Checkin checkinFind) {
		Checkin checkin = checkinRepository.findById(id).orElse(null);
		
		if (checkin == null) {
			return ResponseEntity.notFound().build();
		}
		
		Checkin getCheckin = checkinRepository.save(checkin);
		
		return ResponseEntity.ok(getCheckin);
	}

	// Post
	
	@PostMapping("/guests/post")
	public Hospede createGuest(@RequestBody Hospede hospede) {
		return hospedeRepository.save(hospede);
	}
	
	@PostMapping(value="/checkin/post")
	public Checkin createCheckin(@RequestBody Checkin checkin) {
		return checkinRepository.save(checkin);
	}
	
	
	// Put
	
	@PutMapping(value="/checkin/{id}")
	public ResponseEntity<Checkin> updateCheckin(@PathVariable Long id, @RequestBody Checkin checkinUpdate) {
		Checkin checkin = checkinRepository.findById(id).orElse(null);
		
		if (checkin == null) {
			return ResponseEntity.notFound().build();
		}
		
		checkin.setId(checkinUpdate.getId());
		checkin.setAdicionalVeiculo(checkinUpdate.isAdicionalVeiculo());
		checkin.setDataEntrada(checkinUpdate.getDataEntrada());
		checkin.setDataSaida(checkinUpdate.getDataSaida());
		
		Checkin newCheckinUpdate = checkinRepository.save(checkin);
		return ResponseEntity.ok(newCheckinUpdate);
				
	}
	
	@PutMapping(value="/guest/{id}")
	public ResponseEntity<Hospede> updateGuest(@PathVariable Long id, @RequestBody Hospede guestUpdate) {
		Hospede guest = hospedeRepository.findById(id).orElse(null);
		
		if (guest == null) {
			return ResponseEntity.notFound().build();
		}
		
		guest.setId(guestUpdate.getId());
		guest.setNome(guestUpdate.getNome());
		guest.setDocumento(guestUpdate.getDocumento());
		guest.setTelefone(guestUpdate.getTelefone());
		
		Hospede newGuestUpdate = hospedeRepository.save(guest);
		return ResponseEntity.ok(newGuestUpdate);
				
	}
	
	// Delete
	
	@DeleteMapping("/delete/guest/{id}")
	public List<Hospede> deleteGuest(@PathVariable Long id) {
		this.hospedeRepository.deleteById(id);
		return this.hospedeRepository.findAll();
	}
	
	@DeleteMapping("/delete/checkin/{id}")
	public List<Checkin> deleteCheckin(@PathVariable Long id) {
		this.checkinRepository.deleteById(id);
		return this.checkinRepository.findAll();
	}
	
}
