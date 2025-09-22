package com.fsad.springboot.service;

import com.fsad.springboot.model.Artist;

public interface ArtistService
{

	Artist artistlogin(String email, String pwd);

	void signupartist(Artist u);
	
}
