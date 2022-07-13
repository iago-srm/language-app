import { IStorageService } from "../ports";
import AWS, { S3 } from 'aws-sdk';
import fs from 'fs';
import { promisify } from 'util';

export class S3Service implements IStorageService {

  private _s3: S3;

  constructor() {
    AWS.config.update({ region: 'us-east-1' });
    this._s3 = new AWS.S3({apiVersion: '2006-03-01'});
  }

  async uploadFile(file: any, fileName: string) {

    const upload = promisify(this._s3.upload.bind(this._s3));

    await upload ({
      Bucket: 'language-app-profile-image',
      Key: fileName,
      Body: fs.createReadStream(file.path)
    });

    return true;
  }
}
