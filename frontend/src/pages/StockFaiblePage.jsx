import { useState, useEffect } from 'react';
import { getStockFaible } from '../services/medicamentService';
import { obtenirStatut, SEUIL_QUANTITE } from '../utils/statutMedicament';

function StockFaiblePage() {
  const [medicaments, setMedicaments] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState('success');

  useEffect(() => {
    getStockFaible()
      .then((res) => {
        setMedicaments(res.data);
        setChargement(false);
      })
      .catch(() => {
        setTypeMessage('error');
        setMessage('Erreur lors du chargement. Vérifiez que le serveur est démarré.');
        setChargement(false);
      });
  }, []);

  const obtenirRaison = (med) => {
    const stockBas = med.quantite < SEUIL_QUANTITE;
    const bientotExpire = obtenirStatut(med.expiration) === 'bientot';
    return (
      <div className="badge-groupe">
        {stockBas && <span className="badge stock-bas">Stock bas</span>}
        {bientotExpire && <span className="badge bientot">Bientôt expiré</span>}
      </div>
    );
  };

  if (chargement) return <div className="page"><p style={{ padding: '20px' }}>Chargement...</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Médicaments à surveiller</h1>
          <p className="page-subtitle">Quantité inférieure à 20 ou expiration dans moins de 30 jours.</p>
        </div>
      </div>

      {message && <div className={`alert ${typeMessage}`}>{message}</div>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix (MRU)</th>
              <th>Quantité</th>
              <th>Expiration</th>
              <th>Raison</th>
            </tr>
          </thead>
          <tbody>
            {medicaments.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">Aucun médicament à surveiller pour le moment.</td>
              </tr>
            ) : (
              medicaments.map((med) => (
                <tr key={med.id} className="ligne-bientot">
                  <td><strong>{med.nom}</strong></td>
                  <td>{med.prix.toFixed(2)}</td>
                  <td>{med.quantite}</td>
                  <td>{med.expiration}</td>
                  <td>{obtenirRaison(med)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockFaiblePage;
