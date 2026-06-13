package com.projet.medicaments.service;

import com.projet.medicaments.dto.VenteRequete;
import com.projet.medicaments.entity.Medicament;
import com.projet.medicaments.entity.Vente;
import com.projet.medicaments.repository.MedicamentRepository;
import com.projet.medicaments.repository.VenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VenteService {

    @Autowired
    private VenteRepository venteRepository;

    @Autowired
    private MedicamentRepository medicamentRepository;

    public List<Vente> getAll() {
        return venteRepository.findAllByOrderByDateVenteDesc();
    }

    @Transactional
    public Vente enregistrer(VenteRequete req) {
        if (req.getMedicamentId() == null) {
            throw new RuntimeException("Le médicament est obligatoire.");
        }
        if (req.getQuantite() == null || req.getQuantite() <= 0) {
            throw new RuntimeException("La quantité doit être strictement positive.");
        }

        Medicament medicament = medicamentRepository.findById(req.getMedicamentId())
                .orElseThrow(() -> new RuntimeException("Médicament non trouvé avec l'id : " + req.getMedicamentId()));

        if (req.getQuantite() > medicament.getQuantite()) {
            throw new StockInsuffisantException(
                "Stock insuffisant : il reste seulement " + medicament.getQuantite() + " unité(s)."
            );
        }

        medicament.setQuantite(medicament.getQuantite() - req.getQuantite());
        medicamentRepository.save(medicament);

        Vente vente = new Vente(medicament, req.getQuantite(), LocalDateTime.now());
        return venteRepository.save(vente);
    }

    public static class StockInsuffisantException extends RuntimeException {
        public StockInsuffisantException(String message) {
            super(message);
        }
    }
}
