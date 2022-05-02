import { testDbInstance } from '../test.helpers';

class MockCache {
  getOne = testDbInstance.getOne;
  updateOne = testDbInstance.updateOne;
}

export default MockCache;
