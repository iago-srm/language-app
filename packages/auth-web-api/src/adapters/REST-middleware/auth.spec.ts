import { AuthenticationMiddlewareControllerFactory } from './index';
import { AbstractBuilder } from '@/common/test-helpers';

class AuthMiddlewareDataBuilder extends AbstractBuilder {

  constructor() {
    super();
  }

  reset() {
    this.data = {
      req: {},
      headers: {}
    }
  }
}

const sutDataBuilder = new AuthMiddlewareDataBuilder();

describe("Auth Middleware Controller", () => {
  const { controller: sut } = AuthenticationMiddlewareControllerFactory({
    userRepository: {
      getUserByEmail: jest.fn(),
      getUserById: jest.fn(),
      insertUser: jest.fn(),
      updateUser: jest.fn()
    },
    tokenService: {
      generate: jest.fn(),
      verify: jest.fn()
     }
  });

  beforeEach(() => {
    sutDataBuilder.reset();
  });
});
