import { IAuthEventQueue } from "@application/ports";
import { IQueueService } from '@language-app/common-platform';
import axios from 'axios';
import { NewUserHTTPDefinition, SignOutUserHTTPDefinition } from '@language-app/common-core';

export class AuthEventQueue implements IAuthEventQueue {

  _domain_url = `http://${process.env.DOMAIN_IP}:3006/domain`;

  constructor(
    private queueService: IQueueService
  ) {

  }

  async publishNewUser({ id, role, name, email, tokenVersion }) {
    try {
      await axios[NewUserHTTPDefinition.method](`${this._domain_url}/${NewUserHTTPDefinition.path}`, {
        authApiId: id,
        role,
        name,
        email,
        tokenVersion
      });
    } catch(e) {
      throw new Error(e.response.data.message);
    }
    
  }

  async signOutUser({ authApiId, tokenVersion }) {
    try {
      await axios[SignOutUserHTTPDefinition.method](`${this._domain_url}/${SignOutUserHTTPDefinition.path}`, { 
        tokenVersion,
        authApiId 
      });
    } catch(e) {
      throw new Error(e.response.data.message);
    }
  }
}
