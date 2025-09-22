package com.fsad.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fsad.springboot.model.Artist;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Integer>
{
	public Artist getByEmailAndPassword(String email, String password);

}
