import { IProfileImageRepository } from '@application/ports';
import { IStorageService } from '../ports/storage';

export class ProfileImageRepository implements IProfileImageRepository {

  constructor(
    private storageService: IStorageService
  ) {}

  _getImageName(userId: string) {
    return `${userId}`;
  }

  uploadProfileImage(file: any, userId: string) {
    return this.storageService.uploadFile(file, this._getImageName(userId));
  }

  getProfileImageUrl(userId?: string) {
    return userId ? `${process.env.PROFILE_IMAGE_BUCKET}/${this._getImageName(userId)}` : `${process.env.PROFILE_IMAGE_BUCKET}/generic-avatar-1.jpg`;
  }
}
