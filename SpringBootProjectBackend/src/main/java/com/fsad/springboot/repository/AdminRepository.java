package com.fsad.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fsad.springboot.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>
{
	public Admin getByEmailAndPassword(String email, String password);
}
