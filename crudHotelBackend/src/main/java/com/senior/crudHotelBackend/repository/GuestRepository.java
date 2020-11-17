package com.senior.crudHotelBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senior.crudHotelBackend.model.Guest;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long>{

}
