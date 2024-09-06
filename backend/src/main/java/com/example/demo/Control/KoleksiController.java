package com.example.demo.Control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Buku;
import com.example.demo.Model.Koleksi;
import com.example.demo.Repository.KoleksiRepository;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowPrivateNetwork = "true")
@RequestMapping("/api/koleksi")
@RestController
public class KoleksiController {
    @Autowired
    private KoleksiRepository koleksiRepository;

    @RequestMapping()
    public List<Koleksi> getAll(){
        return koleksiRepository.findAll();
    }

    

    @PostMapping("{id}")
    public Koleksi creat(@PathVariable Long id){
        return koleksiRepository.save(new Koleksi(new Buku(id)));
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id){
        koleksiRepository.deleteById(id);
        return "Item berhasil terhapus";
    }
}
