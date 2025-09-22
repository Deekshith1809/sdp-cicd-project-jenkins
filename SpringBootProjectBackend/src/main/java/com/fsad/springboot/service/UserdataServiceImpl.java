package com.fsad.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsad.springboot.model.Userdata;
import com.fsad.springboot.repository.UserdataRepository;

@Service
public class UserdataServiceImpl implements UserdataService
{
	
	@Autowired
	private UserdataRepository userdataRepository;
	
	@Override
	public String signupuser(Userdata a) 
	{
		userdataRepository.save(a);
		return "User added Success";
	}

	@Override
	public Userdata userlogin(String email, String password) {
		// TODO Auto-generated method stub
		return userdataRepository.getByEmailAndPassword(email, password);
	}

}
