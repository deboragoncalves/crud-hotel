package com.senior.crudHotelBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senior.crudHotelBackend.model.Hospede;

@Repository
public interface HospedeRepository extends JpaRepository<Hospede, Long>{

}
