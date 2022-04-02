import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto, LoginUserDto  } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';
import UserRoute from '@routes/users.route';
afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /login', () => {
    it('response should have the Authorization token', async () => {
      const userData: LoginUserDto = {
        email: 'admin@xyz.com',
        password: '#Admin123'
       
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({
        id: 1,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}login`)
        .send(userData).then((res)=>{
          expect( res.statusCode).toEqual(200);
        })
        
    });

    it('JWT Token required', async () => {
      const usersRoute = new UserRoute();
      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`/users`).expect(500)
    });


    
  });
});
