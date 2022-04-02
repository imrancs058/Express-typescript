import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
const auth = require('../middlewares/auth');
class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, auth(`${this.path}`), this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, auth(`${this.path}`), this.usersController.getUserById);
    this.router.post(`${this.path}`, auth(`${this.path}`), validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.delete(`${this.path}/:id(\\d+)`, auth(`/deleteUser`), this.usersController.deleteUser);
  }
}

export default UsersRoute;
