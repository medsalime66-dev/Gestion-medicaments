package com.projet.medicaments.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "medicaments")
public class Medicament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom du médicament est obligatoire")
    @Column(nullable = false)
    private String nom;

    @Positive(message = "Le prix doit être strictement positif")
    @Column(nullable = false)
    private double prix;

    @PositiveOrZero(message = "La quantité ne peut pas être négative")
    @Column(nullable = false)
    private int quantite;

    @NotNull(message = "La date d'expiration est obligatoire")
    @Column(nullable = false)
    private LocalDate expiration;

    public Medicament() {
    }

    public Medicament(Long id, String nom, double prix, int quantite, LocalDate expiration) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
        this.expiration = expiration;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public LocalDate getExpiration() {
        return expiration;
    }

    public void setExpiration(LocalDate expiration) {
        this.expiration = expiration;
    }
}