package com.projet.medicaments.service;

import com.projet.medicaments.entity.Medicament;
import com.projet.medicaments.repository.MedicamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MedicamentService {

    private static final int SEUIL_QUANTITE = 20;
    private static final int SEUIL_JOURS = 30;

    @Autowired
    private MedicamentRepository medicamentRepository;

    public List<Medicament> getAll() {
        return medicamentRepository.findAll();
    }

    public Optional<Medicament> getById(Long id) {
        return medicamentRepository.findById(id);
    }

    public Medicament create(Medicament medicament) {
        return medicamentRepository.save(medicament);
    }

    public Medicament update(Long id, Medicament medicamentDetails) {
        Medicament medicament = medicamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médicament non trouvé avec l'id: " + id));
        medicament.setNom(medicamentDetails.getNom());
        medicament.setPrix(medicamentDetails.getPrix());
        medicament.setQuantite(medicamentDetails.getQuantite());
        medicament.setExpiration(medicamentDetails.getExpiration());
        return medicamentRepository.save(medicament);
    }

    public void delete(Long id) {
        medicamentRepository.deleteById(id);
    }

    public List<Medicament> searchByNom(String nom) {
        return medicamentRepository.findByNomContainingIgnoreCase(nom);
    }

    public List<Medicament> getStockFaible() {
        LocalDate aujourd_hui = LocalDate.now();
        return medicamentRepository.findAll().stream()
                .filter(m -> {
                    long jours = ChronoUnit.DAYS.between(aujourd_hui, m.getExpiration());
                    return m.getQuantite() < SEUIL_QUANTITE || (jours >= 0 && jours <= SEUIL_JOURS);
                })
                .collect(Collectors.toList());
    }
}