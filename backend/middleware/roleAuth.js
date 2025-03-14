const roleAuth = (rolesPermitidos) => {
    return (req, res, next) => {
      if (!rolesPermitidos.includes(req.user.rol)) {
        return res.status(403).json({ error: "Acceso denegado. No tienes permiso para realizar esta acción." });
      }
      next();
    };
  };
  
  module.exports = roleAuth;
  