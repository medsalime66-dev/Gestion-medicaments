export const SEUIL_QUANTITE = 20;
export const SEUIL_JOURS = 30;

export function obtenirStatut(dateExpiration) {
  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);
  const expiration = new Date(dateExpiration);
  const diffJours = Math.ceil((expiration - aujourdHui) / (1000 * 60 * 60 * 24));
  if (diffJours < 0) return 'expire';
  if (diffJours <= SEUIL_JOURS) return 'bientot';
  return 'valide';
}

export function estStockFaible(medicament) {
  return medicament.quantite < SEUIL_QUANTITE || obtenirStatut(medicament.expiration) === 'bientot';
}
