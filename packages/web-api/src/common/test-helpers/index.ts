import { UserDTO } from '@application/ports';

export class TestUserDTOHelper {
  user: UserDTO = {
    id: '1',
    email: 'valid@email.com',
    hashedPassword: 'hashed-password',
    name: 'valid',
    cpf: '12345',
    categories: [],
    extracts: [],
    lastExtractFetch: 0,
  };

  getUser() {
    return this.user;
  }

  withInvalidEmail() {
    this.user.email = 'invalid';
  }
}
