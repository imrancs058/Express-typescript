const passport = require('passport');
const httpStatus = require('http-status');

const allRoles = {
  user: ['/users'],
  admin: ['/users', '/deleteUser'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(Error(httpStatus.UNAUTHORIZED));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new Error(httpStatus.FORBIDDEN));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch(err => next(err));
  };

module.exports = auth;
