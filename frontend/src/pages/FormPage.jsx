import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { create, update, getById } from '../services/medicamentService';

function FormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    quantite: '',
    expiration: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState('success'); // 'success' | 'error'

  useEffect(() => {
    if (isEdit) {
      getById(id)
        .then((res) => setFormData(res.data))
        .catch(() => {
          setTypeMessage('error');
          setMessage('Médicament introuvable.');
        });
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est obligatoire.';
    if (!formData.prix || formData.prix <= 0) newErrors.prix = 'Le prix doit être positif.';
    if (formData.quantite === '' || formData.quantite < 0) newErrors.quantite = 'La quantité est invalide.';
    if (!formData.expiration) newErrors.expiration = "La date d'expiration est obligatoire.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      if (isEdit) {
        await update(id, formData);
        setMessage('Médicament modifié avec succès !');
      } else {
        await create(formData);
        setMessage('Médicament ajouté avec succès !');
      }
      setTypeMessage('success');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setTypeMessage('error');
      // Affiche les erreurs de validation renvoyées par le back-end (statut 400)
      if (err.response && err.response.status === 400 && err.response.data) {
        setErrors(err.response.data);
        setMessage('Veuillez corriger les erreurs du formulaire.');
      } else {
        setMessage("Erreur lors de l'opération. Vérifiez que le serveur est démarré.");
      }
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{isEdit ? 'Modifier le Médicament' : 'Ajouter un Médicament'}</h1>
      </div>

      {message && <div className={`alert ${typeMessage}`}>{message}</div>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du médicament *</label>
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Ex : Paracétamol" />
            {errors.nom && <span className="error-text">{errors.nom}</span>}
          </div>
          <div className="form-group">
            <label>Prix (MRU) *</label>
            <input type="number" name="prix" value={formData.prix} onChange={handleChange} placeholder="Ex : 150.00" step="0.01" min="0" />
            {errors.prix && <span className="error-text">{errors.prix}</span>}
          </div>
          <div className="form-group">
            <label>Quantité *</label>
            <input type="number" name="quantite" value={formData.quantite} onChange={handleChange} placeholder="Ex : 100" min="0" />
            {errors.quantite && <span className="error-text">{errors.quantite}</span>}
          </div>
          <div className="form-group">
            <label>Date d'expiration *</label>
            <input type="date" name="expiration" value={formData.expiration} onChange={handleChange} />
            {errors.expiration && <span className="error-text">{errors.expiration}</span>}
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              {isEdit ? 'Enregistrer les modifications' : 'Ajouter'}
            </button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPage;