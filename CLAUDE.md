
## Évolution — Module Ventes & Stock faible

### Entité Vente (nouvelle)
- id (Long, auto), medicament (@ManyToOne), quantite (int, > 0), dateVente (LocalDateTime)
- À l'enregistrement d'une vente : vérifier que quantite <= stock du médicament,
  sinon erreur 400. Puis décrémenter le stock et sauvegarder la vente.

### Routes Vente
- GET  /api/ventes              -> historique (plus récentes d'abord)
- POST /api/ventes              -> enregistrer une vente { medicamentId, quantite }

### Stock faible
- GET /api/medicaments/stock-faible
- Règle : quantite < 20 OU (jours avant expiration entre 0 et 30 inclus).
  Exclure les médicaments déjà expirés (jours < 0).

### Règles
- NE PAS modifier l'entité Medicament ni le formulaire d'ajout existant.
- Travailler étape par étape, tester le backend avant le frontend.
