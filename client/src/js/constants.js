export const APP_NAME = 'Not IG';

export const ROOT_LOCALHOST = 'http://localhost:5000';
export const ROOT_PROD = 'https://not-ig-9366c.web.app';

const ROOT_URL = ROOT_PROD;

export const APIS = {
  signup: `${ROOT_URL}/users/v1/signup`,
  all_images: `${ROOT_URL}/images/v1/all`,
  upload_images: `${ROOT_URL}/images/v1/upload`,
  remove_images: `${ROOT_URL}/images/v1/remove`,
  makePublic_image: `${ROOT_URL}/images/v1/public`,
  makePrivate_image: `${ROOT_URL}/images/v1/private`,
  bucket_image: (path, token) => {
    return `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(path)}?alt=media&token=${token}`
  }
  
};
