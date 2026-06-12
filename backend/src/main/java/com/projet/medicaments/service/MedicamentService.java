package com.projet.medicaments.service;

import com.projet.medicaments.entity.Medicament;
import com.projet.medicaments.repository.MedicamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MedicamentService {

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
}