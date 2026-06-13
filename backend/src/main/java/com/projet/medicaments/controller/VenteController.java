package com.projet.medicaments.controller;

import com.projet.medicaments.dto.VenteRequete;
import com.projet.medicaments.entity.Vente;
import com.projet.medicaments.service.VenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ventes")
public class VenteController {

    @Autowired
    private VenteService venteService;

    @GetMapping
    public List<Vente> getAll() {
        return venteService.getAll();
    }

    @PostMapping
    public ResponseEntity<?> enregistrer(@RequestBody VenteRequete req) {
        try {
            Vente vente = venteService.enregistrer(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(vente);
        } catch (VenteService.StockInsuffisantException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("erreur", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("erreur", e.getMessage()));
        }
    }
}
