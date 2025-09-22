package com.fsad.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fsad.springboot.model.Userdata;

@Repository
public interface UserdataRepository extends JpaRepository<Userdata, Integer>
{
	public Userdata getByEmailAndPassword(String email, String password);
}
