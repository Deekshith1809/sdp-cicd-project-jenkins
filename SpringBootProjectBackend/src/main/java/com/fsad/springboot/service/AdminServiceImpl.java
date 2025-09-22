package com.fsad.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsad.springboot.model.Admin;
import com.fsad.springboot.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService
{

	@Autowired
	public AdminRepository adminRepository;
	
	@Override
	public Admin adminlogin(String email, String pwd) 
	{
		return adminRepository.getByEmailAndPassword(email, pwd);
	}

}
