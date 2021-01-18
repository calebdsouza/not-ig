'use strict';
require('dotenv').config();
const { delimiter } = require('path');
const uuid = require('uuid-v4');
const { storage } = require('./fireAdmin');

const bucket = storage.bucket();

const getBasePrefix = (uid, domain) => {
  return `images/${uid}`
}

const getDestPath = (uid, domain, fileName) => {
  return `${getBasePrefix(uid)}/${domain}/${fileName.replace(/ /g, "_")}`
}

const getPublicPrefix = (uid) => {
  return `${getBasePrefix(uid)}/public`
}

const uploadImage = async (uid, domain, file) => {
  const { originalname, buffer } = file
  const fileUid = await uuid();
  const detFileName =  originalname;
  const metadata = {
    contentType: file.mimetype,
    firebaseStorageDownloadTokens: fileUid,
  };

  const detFilePath = getDestPath(uid, domain, detFileName);
  
  const blob = bucket.file(detFilePath);
  const blobStream = blob.createWriteStream(metadata);

  try {
    const res = await blobStream.end(buffer)
  } catch (error) {
    console.log("Upload File Error:", error)
  }
  file["path"] = detFilePath;
  return file;
}

const makeImgPublic = (uid, fileName) => {
  const file = bucket.file(getDestPath(uid, 'private', fileName));
  return file.move(getDestPath(uid, 'public', fileName));
}

const makeImgPrivate = (uid, fileName) => {
  const file = bucket.file(getDestPath(uid, 'public', fileName));
  return file.move(getDestPath(uid, 'private', fileName));
}

const deleteFile = (filePath) => { 
  const file = bucket.file(filePath);
  return file.delete();
}

const getMetadataForImages = async (uid, domain) => {
  const options = {
    prefix: domain === '' ? `${getBasePrefix(uid)}` : `${getPublicPrefix(uid)}/${domain}`,
  }
  const [files] = await bucket.getFiles(options)
  return files
  .filter(file => {
    return (
      file.metadata !== undefined ?
      file.metadata.contentType.includes('image/') :
      false
    )
  })
  .map(file => {
    return file.metadata;
  });
}

module.exports = {
  uploadImage,
  makeImgPublic,
  makeImgPrivate,
  deleteFile,
  getMetadataForImages,
};


