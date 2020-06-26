package com.example.RegistrationApplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.RegistrationApplication.model.UserInfo;

@Repository
public interface RegistrationRepository extends JpaRepository<UserInfo,Integer> {

}
