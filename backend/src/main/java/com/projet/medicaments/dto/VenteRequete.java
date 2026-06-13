package com.projet.medicaments.dto;

public class VenteRequete {

    private Long medicamentId;
    private Integer quantite;

    public VenteRequete() {}

    public Long getMedicamentId() { return medicamentId; }
    public void setMedicamentId(Long medicamentId) { this.medicamentId = medicamentId; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }
}
