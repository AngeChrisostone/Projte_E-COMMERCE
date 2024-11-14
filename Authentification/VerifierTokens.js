// Importer jwt
import jwt from 'jsonwebtoken';

// Middleware de vérification du token
export const verifierToken = (req, res, next) => {
  // Récupération du token dans l'en-tête Authorization
  const bearerToken = req.header('Authorization');
  
  // Vérifier si le token est présent
  if (!bearerToken) {
    return res.status(401).json({ error: 'Accès refusé, token manquant' });
  }

  // Extraire le token en supprimant "Bearer " du début
  const token = bearerToken.split(' ')[1];

  // Vérification et décodage du token
  jwt.verify(token, process.env.CODE_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalide' });
    }
    
    // Assigner l'ID utilisateur à req pour les prochaines étapes
    req.userId = payload.id;
    next();
  });
};