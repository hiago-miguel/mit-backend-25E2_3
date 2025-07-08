const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      mensagem: 'Dados inválidos',
      errors: errors.array() 
    });
  }
  next();
};

const validateCadastro = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('nascimento').notEmpty().withMessage('Data de nascimento é obrigatória'),
  handleValidationErrors
];

const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória'),
  handleValidationErrors
];

const validateFiltro = [
  body('filtro').optional().isString().withMessage('Filtro deve ser uma string'),
  handleValidationErrors
];

module.exports = {
  validateCadastro,
  validateLogin,
  validateFiltro,
  handleValidationErrors
}; 