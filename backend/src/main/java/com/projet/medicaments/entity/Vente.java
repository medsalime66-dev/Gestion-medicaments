package com.projet.medicaments.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventes")
public class Vente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medicament_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Medicament medicament;

    @Positive(message = "La quantité doit être strictement positive")
    @Column(nullable = false)
    private int quantite;

    @Column(nullable = false)
    private LocalDateTime dateVente;

    public Vente() {}

    public Vente(Medicament medicament, int quantite, LocalDateTime dateVente) {
        this.medicament = medicament;
        this.quantite = quantite;
        this.dateVente = dateVente;
    }

    public Long getId() { return id; }

    public Medicament getMedicament() { return medicament; }
    public void setMedicament(Medicament medicament) { this.medicament = medicament; }

    public int getQuantite() { return quantite; }
    public void setQuantite(int quantite) { this.quantite = quantite; }

    public LocalDateTime getDateVente() { return dateVente; }
    public void setDateVente(LocalDateTime dateVente) { this.dateVente = dateVente; }
}
