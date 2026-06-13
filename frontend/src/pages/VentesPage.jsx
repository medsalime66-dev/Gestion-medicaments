import { useState, useEffect } from 'react';
import { getAll } from '../services/medicamentService';
import { getVentes, enregistrerVente } from '../services/venteService';

function VentesPage() {
  const [medicaments, setMedicaments] = useState([]);
  const [ventes, setVentes] = useState([]);
  const [formData, setFormData] = useState({ medicamentId: '', quantite: '' });
  const [message, setMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState('success');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    chargerDonnees();
  }, []);

  const chargerDonnees = async () => {
    try {
      const [resMeds, resVentes] = await Promise.all([getAll(), getVentes()]);
      setMedicaments(resMeds.data);
      setVentes(resVentes.data);
    } catch {
      setTypeMessage('error');
      setMessage('Erreur lors du chargement. Vérifiez que le serveur est démarré.');
    }
  };

  const valider = () => {
    const e = {};
    if (!formData.medicamentId) e.medicamentId = 'Veuillez sélectionner un médicament.';
    if (!formData.quantite || parseInt(formData.quantite) < 1)
      e.quantite = 'La quantité doit être au moins 1.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valider()) return;
    try {
      await enregistrerVente({
        medicamentId: parseInt(formData.medicamentId),
        quantite: parseInt(formData.quantite),
      });
      setTypeMessage('success');
      setMessage('Vente enregistrée avec succès !');
      setFormData({ medicamentId: '', quantite: '' });
      setErrors({});
      chargerDonnees();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setTypeMessage('error');
      setMessage(err.response?.data?.erreur || 'Erreur lors de l\'enregistrement.');
    }
  };

  const stats = {
    totalVentes: ventes.length,
    unitesVendues: ventes.reduce((s, v) => s + v.quantite, 0),
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Ventes</h1>
      </div>

      {message && <div className={`alert ${typeMessage}`}>{message}</div>}

      {/* Statistiques */}
      <div className="stats-grid">
        <div className="stat-card stat-ventes">
          <span className="stat-valeur">{stats.totalVentes}</span>
          <span className="stat-libelle">Total des ventes</span>
        </div>
        <div className="stat-card stat-unites">
          <span className="stat-valeur">{stats.unitesVendues}</span>
          <span className="stat-libelle">Unités vendues</span>
        </div>
      </div>

      {/* Formulaire */}
      <div className="form-card" style={{ marginBottom: '28px', maxWidth: '100%' }}>
        <h2 className="section-titre">Enregistrer une vente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Médicament</label>
            <select
              value={formData.medicamentId}
              onChange={(e) => setFormData({ ...formData, medicamentId: e.target.value })}
            >
              <option value="">-- Sélectionner un médicament --</option>
              {medicaments
                .filter((m) => m.quantite > 0)
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nom} (stock : {m.quantite})
                  </option>
                ))}
            </select>
            {errors.medicamentId && <span className="error-text">{errors.medicamentId}</span>}
          </div>
          <div className="form-group">
            <label>Quantité à vendre</label>
            <input
              type="number"
              min="1"
              value={formData.quantite}
              onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
              placeholder="Ex. 3"
            />
            {errors.quantite && <span className="error-text">{errors.quantite}</span>}
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">Enregistrer la vente</button>
          </div>
        </form>
      </div>

      {/* Historique */}
      <h2 className="section-titre" style={{ marginBottom: '14px' }}>Historique des ventes</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Médicament</th>
              <th>Quantité</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {ventes.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">Aucune vente enregistrée.</td>
              </tr>
            ) : (
              ventes.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td><strong>{v.medicament?.nom}</strong></td>
                  <td>{v.quantite}</td>
                  <td>{new Date(v.dateVente).toLocaleString('fr-FR')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VentesPage;
