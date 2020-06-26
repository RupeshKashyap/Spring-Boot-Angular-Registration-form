package com.example.RegistrationApplication.service.serviceImpl;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.RegistrationApplication.model.UserInfo;
import com.example.RegistrationApplication.repository.RegistrationRepository;
import com.example.RegistrationApplication.service.RegistrationService;

import antlr.collections.List;

@Service
public class RegistrationServiceImpl implements RegistrationService {

	@Autowired
	RegistrationRepository registrationRepository;

	@Override
	public ArrayList<UserInfo> getAllUser() {
		// TODO Auto-generated method stub

		return  (ArrayList<UserInfo>) registrationRepository.findAll();
	}

	@Override
	public UserInfo save(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return registrationRepository.save(userInfo);
	}

	@Override
	public UserInfo getUserById(Integer id) {
		// TODO Auto-generated method stub

		return registrationRepository.findById(id).get();
	}

	@Override
	public void deleteUser(Integer id) {
		// TODO Auto-generated method stub
		registrationRepository.deleteById(id);
	}

	@Override
	public UserInfo updateUser(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return registrationRepository.save(userInfo);
	}

}
