import multer from 'multer';

export const putFileInReq = multer({ dest: '/temp/files' }).single('profile-image');
