package com.senior.crudHotelBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.senior.crudHotelBackend.model.Checkin;

public interface CheckinRepository extends JpaRepository<Checkin, Long> {

}
