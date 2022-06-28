import { IProfileImageRepository } from '@application/ports';
import { IStorageService } from '../ports/storage';

export class ProfileImageRepository implements IProfileImageRepository {

  constructor(
    private storageService: IStorageService
  ) {}

  _getImageName(userId: string) {
    return `${userId}-${Date.now()}`;
  }

  async uploadProfileImage(file: any, userId: string) {
    const imageName = this._getImageName(userId)
    await this.storageService.uploadFile(file, imageName);
    return `${process.env.PROFILE_IMAGE_BUCKET}/${imageName}`;
  }

  // getProfileImageUrl(userId?: string) {
  //   return userId ? `${process.env.PROFILE_IMAGE_BUCKET}/${this._getImageName(userId)}` : `${process.env.PROFILE_IMAGE_BUCKET}/generic-avatar-1.jpg`;
  // }
}
