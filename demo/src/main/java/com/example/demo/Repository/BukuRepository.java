package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Buku;

public interface BukuRepository extends JpaRepository<Buku, Long>{
    
}
