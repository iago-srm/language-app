import { faker } from '@faker-js/faker';

export class EmailGenerator {
  getInvalidEmails() {
    return ['1234','eefdfsdfsfr','email invalido']
  }

  getValidEmail() {
    return faker.internet.email();
  }
}

export class NameGenerator {
  getName() {
    return faker.name.findName()
  }
}
