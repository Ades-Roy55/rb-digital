package com.example.demo.Control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Stori;
import com.example.demo.Repository.StoriRepository;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowPrivateNetwork = "true")
@RequestMapping("/api/stori")
@RestController
public class StoriController {
    @Autowired
    private StoriRepository storiRepository;

    @RequestMapping()
    public List<Stori> getAll(){
        return storiRepository.findAll();
    }

    @PostMapping
    public Stori create(@RequestBody Stori stori){
        return storiRepository.save(stori);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stori> editById(@PathVariable Long id, @RequestBody Stori stori){
        if(!storiRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        stori.setId(id);
        Stori updateStori = storiRepository.save(stori);
        return ResponseEntity.ok(updateStori); 
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id){
        storiRepository.deleteById(id);
        return "Stori Berhasil Dihapus";
    }
}

    
