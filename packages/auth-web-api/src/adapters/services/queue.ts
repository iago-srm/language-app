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

  async publishNewUser({ id, role, name, email, tokenVersion, image }) {
    try {
      await axios[NewUserHTTPDefinition.method](`${this._domain_url}/${NewUserHTTPDefinition.path}`, {
        authApiId: id,
        role,
        name,
        email,
        tokenVersion,
        image
      });
      // console.log({id, role, name, email, tokenVersion, image })

    } catch(e) {
      throw new Error(e.response ? e.response.data.message : e);
    }
    
  }

  async signOutUser({ authApiId, tokenVersion }) {
    try {
      await axios[SignOutUserHTTPDefinition.method](`${this._domain_url}/${SignOutUserHTTPDefinition.path}`, { 
        tokenVersion,
        authApiId 
      });
    } catch(e) {
      console.log({e})
      throw new Error(e.response ? e.response.data.message : e);
    }
  }
}
