const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_jwt';

const authMiddleware = (req, res, next) => {
  // Verificar token no cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ mensagem: 'Token inválido' });
  }
};

const generateToken = (usuario) => {
  return jwt.sign(
    { 
      id: usuario.id, 
      email: usuario.email,
      nome: usuario.nome 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = { authMiddleware, generateToken, JWT_SECRET }; 