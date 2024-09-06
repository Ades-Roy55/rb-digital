package com.example.demo.Control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Buku;
import com.example.demo.Repository.BukuRepository;

@RequestMapping("/api/buku")
@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowPrivateNetwork = "true")
public class BukuController {
    @Autowired
    private BukuRepository bukuRepository;

    @RequestMapping()
    public List<Buku> getAll(){
        return bukuRepository.findAll();
    }

    @PostMapping
    public Buku creat(@RequestBody Buku buku){
        return bukuRepository.save(buku);
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id){
        bukuRepository.deleteById(id);
        return "Item berhasil terhapus";
    }
}
