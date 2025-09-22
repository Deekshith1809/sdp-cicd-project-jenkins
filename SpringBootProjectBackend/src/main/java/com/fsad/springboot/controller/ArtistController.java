package com.fsad.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fsad.springboot.model.Artist;
import com.fsad.springboot.model.Userdata;
import com.fsad.springboot.service.ArtistService;

@RestController
@RequestMapping("/artist")
public class ArtistController 
{
	@Autowired
	private ArtistService artistService;
	
	@PostMapping("/register")
	public String adduser(@RequestBody Artist u)
	{
		artistService.signupartist(u);
		return "Succes";
	}
	
	@PostMapping("/login")
	public ResponseEntity<Artist> loginuser(@RequestBody JsonNode data)
	{
		String email=data.get("email").asText();
		String pwd=data.get("password").asText();
		Artist u=artistService.artistlogin(email, pwd);
		return ResponseEntity.ok(u);
	}

}
