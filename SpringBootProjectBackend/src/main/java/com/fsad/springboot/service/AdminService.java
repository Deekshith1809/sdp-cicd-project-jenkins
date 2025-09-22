package com.fsad.springboot.service;

import com.fsad.springboot.model.Admin;

public interface AdminService {

	Admin adminlogin(String email, String pwd);

}
