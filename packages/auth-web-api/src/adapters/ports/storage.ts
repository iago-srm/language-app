export interface IStorageService {
  uploadFile: (file: any, fileName: string) => Promise<boolean>;
  // getFileUrl: (fileName: string) => string;
}
