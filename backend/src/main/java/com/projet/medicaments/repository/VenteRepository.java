package com.projet.medicaments.repository;

import com.projet.medicaments.entity.Vente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VenteRepository extends JpaRepository<Vente, Long> {
    List<Vente> findAllByOrderByDateVenteDesc();
}
