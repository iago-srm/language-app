import { IProfileImageRepository } from "@application/ports";
import { IStorageService } from "@language-app/common-platform";

export class ProfileImageRepository implements IProfileImageRepository {
  constructor(private storageService: IStorageService) {}

  _getBucketUrl() {
    return `https://${process.env.PROFILE_IMAGE_BUCKET}.s3.amazonaws.com`;
  }
  _getImageName(userId: string) {
    return `${userId}-${Date.now()}`;
  }

  async uploadProfileImage(file: any, userId: string) {
    const imageName = this._getImageName(userId);
    try {
      await this.storageService.uploadFile(
        file,
        imageName,
        process.env.PROFILE_IMAGE_BUCKET
      );
    } catch (e) {
      console.log("s3 error", e);
      throw new Error("S3 error");
    }
    return this._getBucketUrl() + "/" + imageName;
  }

  getGenericImageUrl() {
    return this._getBucketUrl() + "/generic-avatar-1.jpg";
  }
  // getProfileImageUrl(userId?: string) {
  //   return userId ? `${process.env.PROFILE_IMAGE_BUCKET}/${this._getImageName(userId)}` : `${process.env.PROFILE_IMAGE_BUCKET}/generic-avatar-1.jpg`;
  // }
}
