package com.fsad.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fsad.springboot.model.Admin;
import com.fsad.springboot.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController
{
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/login")
	public ResponseEntity<Admin> loginuser(@RequestBody JsonNode data)
	{
		String email=data.get("email").asText();
		String pwd=data.get("password").asText();
		Admin u=adminService.adminlogin(email, pwd);
		return ResponseEntity.ok(u);
	}
}
