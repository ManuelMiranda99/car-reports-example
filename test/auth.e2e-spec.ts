import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const signUpEmail = 'test1234@test.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: signUpEmail,
        password: '1234567',
      })
      .expect(201)
      .then((response) => {
        const { id, email } = response.body;

        expect(id).toBeDefined();
        expect(email).toEqual(signUpEmail);
      });
  });
});
