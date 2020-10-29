package com.senior.crudHotelBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senior.crudHotelBackend.checkInModel.CheckinModel;

@Repository
public interface CheckinRepository extends JpaRepository<CheckinModel, Long> {

}
