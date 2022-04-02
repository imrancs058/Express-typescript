const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
import { PASSWORD_SALT } from '@config';
import userService from '@services/users.service';
const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
};
const jwtOptions = {
  secretOrKey: PASSWORD_SALT,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const usersService = new userService();
const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await usersService.findUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
