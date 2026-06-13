package com.projet.medicaments.controller;

import com.projet.medicaments.entity.Medicament;
import com.projet.medicaments.service.MedicamentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medicaments")
public class MedicamentController {

    @Autowired
    private MedicamentService medicamentService;

    @GetMapping
    public List<Medicament> getAll() {
        return medicamentService.getAll();
    }

    @GetMapping("/stock-faible")
    public List<Medicament> getStockFaible() {
        return medicamentService.getStockFaible();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicament> getById(@PathVariable Long id) {
        return medicamentService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Medicament> create(@Valid @RequestBody Medicament medicament) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(medicamentService.create(medicament));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicament> update(@PathVariable Long id,
                                             @Valid @RequestBody Medicament medicament) {
        try {
            return ResponseEntity.ok(medicamentService.update(id, medicament));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (medicamentService.getById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        medicamentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Medicament> search(@RequestParam String nom) {
        return medicamentService.searchByNom(nom);
    }

    /**
     * Gestionnaire des erreurs de validation :
     * renvoie un objet { champ: message } avec le statut 400.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> gererErreursValidation(MethodArgumentNotValidException ex) {
        Map<String, String> erreurs = new HashMap<>();
        for (FieldError erreur : ex.getBindingResult().getFieldErrors()) {
            erreurs.put(erreur.getField(), erreur.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(erreurs);
    }
}