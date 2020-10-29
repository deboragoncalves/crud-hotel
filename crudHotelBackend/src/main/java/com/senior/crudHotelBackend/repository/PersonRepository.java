package com.senior.crudHotelBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senior.crudHotelBackend.personModel.personModel;

@Repository
public interface PersonRepository extends JpaRepository<personModel, Long>{

}
