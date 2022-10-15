import * as awilix from 'awilix';
import dotenv from 'dotenv';
import { Strings } from '@common/locale';
import { registerServer, startPolyglot } from '@language-app/common-platform';
import {
  registerDependencies,
} from '@main';

dotenv.config();

const container = awilix.createContainer();

registerDependencies(container);
registerServer(container, '/auth-web-api', startPolyglot(new Strings()));

const server = container.resolve('server');

(async () => {
  try {
    await server.start()
  } catch(e) {
    console.error('Server instanciation failed', e);
  }
})()
