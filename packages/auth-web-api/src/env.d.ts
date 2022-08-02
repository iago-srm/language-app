declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROFILE_IMAGE_BUCKET: string;
    }
  }
}

export {}
