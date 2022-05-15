import { ITokenService } from '@application/ports';
import { TokenGenerationError } from '@common/errors';
import jwt from 'jsonwebtoken';

export class JWTTokenService implements ITokenService {
  token_secret = process.env.TOKEN_SECRET;

  generate(args: any) {
    try {
      const resp = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 6,
          data: args,
        },
        // this.token_secret
        undefined
      );
      return resp
    } catch(e) {
      console.error(e)
      // rethrowing another error like this does not work.
      // the original error is still thrown. why????
      throw new TokenGenerationError({ error: "fdfsf" })
    }
  }

  async verify(token: string) {
    // const verify = promisify(jwt.verify);
    const payload = jwt.verify(token, this.token_secret) as any;
    return payload.data;
  }
}
