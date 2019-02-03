function hasRole (role) {
  return hasRole[role] || (hasRole[role] = function (req, res, next) {
    if ((Array.isArray(role) && role.includes(req.user.role_id)) || req.user.role_id === role){
      return next();
    }

    res.status(403).json({ error: 'Access Denied' });
  });
}

module.exports = {
  hasRole
};
