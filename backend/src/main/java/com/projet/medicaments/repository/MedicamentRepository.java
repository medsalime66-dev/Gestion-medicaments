package com.projet.medicaments.repository;

import com.projet.medicaments.entity.Medicament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicamentRepository extends JpaRepository<Medicament, Long> {
    List<Medicament> findByNomContainingIgnoreCase(String nom);
}