import multer from 'multer';

export const putFileInReq = multer({ dest: '/tmp/files' }).single('profile-image');
