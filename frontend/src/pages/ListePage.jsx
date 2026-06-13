import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, remove, search } from '../services/medicamentService';
import { obtenirStatut, estStockFaible } from '../utils/statutMedicament';

function ListePage() {
  const [medicaments, setMedicaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    loadMedicaments();
  }, []);

  const loadMedicaments = async () => {
    try {
      const res = await getAll();
      setMedicaments(res.data);
    } catch (err) {
      setTypeMessage('error');
      setMessage('Erreur lors du chargement. Vérifiez que le serveur est démarré.');
    }
  };

  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim() === '') {
      loadMedicaments();
    } else {
      try {
        const res = await search(val);
        setMedicaments(res.data);
      } catch (err) {
        setTypeMessage('error');
        setMessage('Erreur lors de la recherche.');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce médicament ?')) {
      try {
        await remove(id);
        setTypeMessage('success');
        setMessage('Médicament supprimé avec succès !');
        loadMedicaments();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setTypeMessage('error');
        setMessage('Erreur lors de la suppression.');
      }
    }
  };

  const LIBELLES_STATUT = {
    valide: 'Valide',
    bientot: 'Bientôt expiré',
    expire: 'Expiré',
  };

  // Statistiques calculées à partir de la liste affichée
  const stats = {
    total: medicaments.length,
    valides: medicaments.filter((m) => obtenirStatut(m.expiration) === 'valide').length,
    bientot: medicaments.filter((m) => obtenirStatut(m.expiration) === 'bientot').length,
    expires: medicaments.filter((m) => obtenirStatut(m.expiration) === 'expire').length,
    valeurStock: medicaments.reduce((somme, m) => somme + m.prix * m.quantite, 0),
    stockFaible: medicaments.filter(
      (m) => estStockFaible(m) && obtenirStatut(m.expiration) !== 'expire'
    ).length,
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Liste des Médicaments</h1>
        <button className="btn-primary" onClick={() => navigate('/add')}>
          + Ajouter
        </button>
      </div>

      {message && <div className={`alert ${typeMessage}`}>{message}</div>}

      {/* Cartes de statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-valeur">{stats.total}</span>
          <span className="stat-libelle">Médicaments</span>
        </div>
        <div className="stat-card stat-valide">
          <span className="stat-valeur">{stats.valides}</span>
          <span className="stat-libelle">Valides</span>
        </div>
        <div className="stat-card stat-bientot">
          <span className="stat-valeur">{stats.bientot}</span>
          <span className="stat-libelle">Bientôt expirés</span>
        </div>
        <div className="stat-card stat-expire">
          <span className="stat-valeur">{stats.expires}</span>
          <span className="stat-libelle">Expirés</span>
        </div>
        <div className="stat-card stat-stock">
          <span className="stat-valeur">{stats.valeurStock.toFixed(2)}</span>
          <span className="stat-libelle">Valeur du stock (MRU)</span>
        </div>
        <div className="stat-card stat-faible">
          <span className="stat-valeur">{stats.stockFaible}</span>
          <span className="stat-libelle">Stock faible</span>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix (MRU)</th>
              <th>Quantité</th>
              <th>Expiration</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicaments.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty">Aucun médicament trouvé.</td>
              </tr>
            ) : (
              medicaments.map((med) => {
                const statut = obtenirStatut(med.expiration);
                return (
                  <tr key={med.id} className={`ligne-${statut}`}>
                    <td>{med.id}</td>
                    <td><strong>{med.nom}</strong></td>
                    <td>{med.prix.toFixed(2)}</td>
                    <td>{med.quantite}</td>
                    <td>{med.expiration}</td>
                    <td>
                      <div className="badge-groupe">
                        <span className={`badge ${statut}`}>
                          {LIBELLES_STATUT[statut]}
                        </span>
                        {estStockFaible(med) && statut !== 'expire' && (
                          <span className="badge stock-faible">Stock faible</span>
                        )}
                      </div>
                    </td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => navigate(`/edit/${med.id}`)}>
                        Modifier
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(med.id)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListePage;