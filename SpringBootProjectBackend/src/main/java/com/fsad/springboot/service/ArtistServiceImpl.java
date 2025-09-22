package com.fsad.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsad.springboot.model.Artist;
import com.fsad.springboot.repository.ArtistRepository;

@Service
public class ArtistServiceImpl implements ArtistService
{
	
	@Autowired
	public ArtistRepository artistRepository;

	@Override
	public Artist artistlogin(String email, String pwd) 
	{
		return artistRepository.getByEmailAndPassword(email, pwd);
	}

	@Override
	public void signupartist(Artist u) {
		// TODO Auto-generated method stub
		artistRepository.save(u);
	}

}
