import { IAuthEventQueue } from "@application/ports";
import { IQueueService } from "@language-app/common-platform";
import axios from "axios";
import {
  NewUserHTTPDefinition,
  DomainUpdateUserHTTPDefinition,
} from "@language-app/common-core";

export class AuthEventQueue implements IAuthEventQueue {
  // _domain_url = `http://${process.env.DOMAIN_IP}:3006/domain`;
  _queue_url = process.env.QUEUE_URL;

  constructor(private queueService: IQueueService) {}

  async publishNewUser({ id, role, name, email, tokenVersion, image }) {
    // try {
    //   await axios[NewUserHTTPDefinition.method](`${this._domain_url}/${NewUserHTTPDefinition.path}`, {
    //     authApiId: id,
    //     role,
    //     name,
    //     email,
    //     tokenVersion,
    //     image
    //   });
    // } catch(e) {
    //   throw new Error(e.response ? e.response.data.message : e);
    // }

    return this.queueService.sendMessage(
      {
        authApiId: id,
        role,
        name,
        email,
        tokenVersion,
        image,
      },
      this._queue_url,
      NewUserHTTPDefinition
    );
  }

  async updateUser({ authApiId, tokenVersion, image }) {
    return this.queueService.sendMessage(
      {
        tokenVersion,
        authApiId,
        image,
      },
      this._queue_url,
      DomainUpdateUserHTTPDefinition
    );
    // try {
    //   await axios[SignOutUserHTTPDefinition.method](`${this._domain_url}/${SignOutUserHTTPDefinition.path}`, {
    //     tokenVersion,
    //     authApiId
    //   });
    // } catch(e) {
    //   console.log({e})
    //   throw new Error(e.response ? e.response.data.message : e);
    // }
  }
}
