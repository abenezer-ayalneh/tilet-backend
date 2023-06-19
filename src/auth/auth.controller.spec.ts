// import { Test } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';

// describe('AuthController', () => {
//   let authController: AuthController;
//   let authService: AuthService;

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [AuthService],
//     }).compile();

//     authService = await module.resolve<AuthService>(AuthService);
//     authController = await module.resolve<AuthController>(AuthController);
//   });

//   describe('signInWithEmail', () => {
//     it('Should return an access token', async () => {
//       const result = { accessToken: 'some-random-access-token' };
//       jest
//         .spyOn(authService, 'signInWithEmail')
//         .mockImplementation(() => result);

//       expect(
//         await authController.signInWithEmail({
//           email: 'john.doe@ablaze.labs',
//           password: 'passpass',
//         })
//       ).toBe(result);
//     });
//   });
// });
