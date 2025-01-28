import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: 'password',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: 'password',
          } as User,
        ]);
      },
      remove: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: 'password',
        } as User);
      },
    };

    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('throws NotFoundException when calling with non existing user', async () => {
    fakeUsersService.findOne = () => null;

    await expect(controller.findUser(1)).rejects.toThrow(NotFoundException);
  });

  it('returns an user when findUser is called with existing user id', async () => {
    const user = await controller.findUser(1);

    expect(user).toBeDefined();
  });

  it('returns a list of users with the given email when calling findAllUsers', async () => {
    const users = await controller.findAllUsers('test@test.com');

    expect(users).toHaveLength(1);
    expect(users[0].email).toEqual('test@test.com');
  });

  it('returns an user with existing credentials when calling signin and updates session object', async () => {
    const session = {
      userId: undefined,
    };
    const user = await controller.signin(
      {
        email: 'test@test.com',
        password: 'password',
      },
      session,
    );

    expect(user).toBeDefined();
    expect(user.email).toEqual('test@test.com');
    expect(user.password).toEqual('password');
    expect(session.userId).toEqual(1);
  });
});
