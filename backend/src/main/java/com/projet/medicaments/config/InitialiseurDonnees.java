package com.projet.medicaments.config;

import com.projet.medicaments.entity.Medicament;
import com.projet.medicaments.repository.MedicamentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

/**
 * Initialiseur de données : insère des médicaments de démonstration
 * au démarrage de l'application, uniquement si la base est vide.
 * Les dates d'expiration sont relatives à la date du jour afin que
 * les trois statuts (Valide / Bientôt expiré / Expiré) soient toujours visibles.
 */
@Configuration
public class InitialiseurDonnees {

    @Bean
    CommandLineRunner initialiserBaseDeDonnees(MedicamentRepository medicamentRepository) {
        return args -> {
            // Ne rien faire si la base contient déjà des données
            if (medicamentRepository.count() > 0) {
                return;
            }

            LocalDate aujourdHui = LocalDate.now();

            List<Medicament> medicamentsDemo = List.of(
                    // --- Médicaments valides (expiration lointaine) ---
                    new Medicament(null, "Paracétamol 500mg", 45.00, 250, aujourdHui.plusYears(2)),
                    new Medicament(null, "Amoxicilline 1g", 320.50, 120, aujourdHui.plusMonths(18)),
                    new Medicament(null, "Ibuprofène 400mg", 85.00, 180, aujourdHui.plusYears(1)),
                    new Medicament(null, "Oméprazole 20mg", 210.00, 95, aujourdHui.plusMonths(10)),
                    new Medicament(null, "Metformine 850mg", 150.75, 200, aujourdHui.plusMonths(14)),

                    // --- Médicaments bientôt expirés (moins de 30 jours) ---
                    new Medicament(null, "Aspirine 100mg", 60.00, 75, aujourdHui.plusDays(20)),
                    new Medicament(null, "Doliprane sirop enfant", 130.00, 40, aujourdHui.plusDays(12)),
                    new Medicament(null, "Vitamine C 1000mg", 95.50, 60, aujourdHui.plusDays(5)),

                    // --- Médicaments expirés ---
                    new Medicament(null, "Sirop contre la toux", 175.00, 15, aujourdHui.minusDays(10)),
                    new Medicament(null, "Pommade antiseptique", 88.00, 8, aujourdHui.minusMonths(2))
            );

            medicamentRepository.saveAll(medicamentsDemo);
            System.out.println(">>> Base de données initialisée avec "
                    + medicamentsDemo.size() + " médicaments de démonstration.");
        };
    }
}