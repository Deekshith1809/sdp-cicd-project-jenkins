package com.fsad.springboot.service;

import com.fsad.springboot.model.Userdata;

public interface UserdataService 
{
	public String signupuser(Userdata a);
	public Userdata userlogin(String email,String password);

}
