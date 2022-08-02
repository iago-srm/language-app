import { IAuthEventQueue } from "@application/ports";
import { IQueueService } from '@language-app/common';

export class AuthEventQueue implements IAuthEventQueue {

  constructor(
    private queueService: IQueueService
  ) {

  }

  async publishNewUser(args) {

  }
}
