import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import AuthService from '@services/auth.service';
const jwt = require('jsonwebtoken');
const moment = require('moment');
import { ACCESSEXPIRATIONMINUTES, REFRESHEXPIRATIONDAYS, PASSWORD_SALT } from '@config';
const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
};
class AuthController {
  public authService = new AuthService();
  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const findUser = await this.authService.login(userData);
      const tok = await this.generateAuthTokens(findUser);
      res.status(200).json({ data: { findUser, tok }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public generateAuthTokens = async user => {
    const accessTokenExpires = moment().add(ACCESSEXPIRATIONMINUTES, 'minutes');
    const accessToken = this.generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(REFRESHEXPIRATIONDAYS, 'days');
    const refreshToken = this.generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };

  public generateToken = (userId, expires, type, secret = PASSWORD_SALT) => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  };
}

export default AuthController;
