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
import com.senior.crudHotelBackend.model.Guest;
import com.senior.crudHotelBackend.repository.CheckinRepository;
import com.senior.crudHotelBackend.repository.GuestRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class HotelController {
	
	@Autowired
	private GuestRepository guestRepository;
	
	@Autowired
	private CheckinRepository checkinRepository;
	
	// Get
	
	@GetMapping("/guests")
	public List<Guest> getAllGuests() {
		return guestRepository.findAll();
	}
	
	@GetMapping("/checkin")
	public List<Checkin> getAllCheckin() {
		return checkinRepository.findAll();
	}
	
	@GetMapping("/guests/{id}")
	public ResponseEntity<Guest> getGuestsById(@PathVariable Long id, Guest guestFind) {
		Guest guest = guestRepository.findById(id).orElse(null);
		
		if (guest == null) {
			return ResponseEntity.notFound().build();
		}
		
		Guest getGuest = guestRepository.save(guest);
		
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
	
	@PostMapping(value="/guest")
	public Guest createGuest(@RequestBody Guest guest) {
		return guestRepository.save(guest);
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
		checkin.setPlusCar(checkinUpdate.getPlusCar());
		checkin.setDateIn(checkinUpdate.getDateIn());
		checkin.setDateOut(checkinUpdate.getDateOut());
		
		Checkin newCheckinUpdate = checkinRepository.save(checkin);
		return ResponseEntity.ok(newCheckinUpdate);
				
	}
	
	@PutMapping(value="/guest/{id}")
	public ResponseEntity<Guest> updateGuest(@PathVariable Long id, @RequestBody Guest guestUpdate) {
		Guest guest = guestRepository.findById(id).orElse(null);
		
		if (guest == null) {
			return ResponseEntity.notFound().build();
		}
		
		guest.setId(guestUpdate.getId());
		guest.setName(guestUpdate.getName());
		guest.setDocument(guestUpdate.getDocument());
		guest.setPhone(guestUpdate.getPhone());
		
		Guest newGuestUpdate = guestRepository.save(guest);
		return ResponseEntity.ok(newGuestUpdate);
				
	}
	
	// Delete
	
	@DeleteMapping("/delete/guest/{id}")
	public List<Guest> deleteGuest(@PathVariable Long id) {
		this.guestRepository.deleteById(id);
		return this.guestRepository.findAll();
	}
	
	@DeleteMapping("/delete/checkin/{id}")
	public List<Checkin> deleteCheckin(@PathVariable Long id) {
		this.checkinRepository.deleteById(id);
		return this.checkinRepository.findAll();
	}
	
}
