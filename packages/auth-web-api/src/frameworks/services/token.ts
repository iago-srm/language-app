import { ITokenService } from '@application/ports';
import jwt from 'jsonwebtoken';

export class JWTTokenService implements ITokenService {
  token_secret = process.env.TOKEN_SECRET;

  generate(args: any) {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 6,
        data: args,
      },
      this.token_secret
    );
  }

  async verify(token: string) {
    // const verify = promisify(jwt.verify);
    const payload = jwt.verify(token, this.token_secret) as any;
    return payload.data;
  }
}
