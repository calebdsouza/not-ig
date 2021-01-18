const { 
  uploadImage, 
  makeImgPublic, 
  makeImgPrivate,
  deleteFile,
  getMetadataForImages
} = require('../firebase/storage');
const express = require('express');
const router = express.Router();
const { validateToken } = require('../firebase/authenticate');
const { formDataParser } = require('./utils');

const log = console.log;
const err = console.error;

router.get('/all', validateToken, (req, res, next) => {
  const user = req['currentUser'];
  getMetadataForImages(user.uid, '')
  .then(files => {
    res.status(200).send({ files: files })
    return;
  })
  .catch(error => {
    err("Internal Server Error Getting All Images:\n", error)
    res.status(500).send('Internal Server Error');
    next();
  });
});

router.get('/public', (req, res, next) => {
  getMetadataForImages('resr', 'public')
  .then(files => {
    res.status(200).send({ files: files })
    return;
  })
  .catch(error => {
    err("Internal Server Error Getting All Images:\n", error)
    res.status(500).send('Internal Server Error');
    next();
  });
})

router.post('/upload', formDataParser, (req, res, next) => {
  const user = req['currentUser'];
  const files = req.files;

  if (files.length < 1) {
    log("Bad Request:\n No image files recived");
    res.status(403).send('Bad Request');
  } 

  const uploaded = [];
  files.forEach(file => {
    try {
      const promise = uploadImage(user.uid, 'private', file);
      uploaded.push(promise)
    } catch (error) {
      throw error;
    }
  });

  Promise.all(uploaded)
  .then((values) => {
    res.status(200).send({uploaded: values});
    return;
  })
  .catch((error) => {
    err("Internal Server Error Uploading Image:\n", error);
    res.status(500).send("Internal Server Error");
  });
});

router.patch('/public', validateToken, async (req, res, next) => {
  const user = req['currentUser'];
  const filePath = JSON.parse(req.body).filePath;
  
  try {
    const data = await makeImgPublic(user.uid, filePath);
    res.status(200).send({updatedFile: data[1]});
    return;
  } catch(error) {
    if (error.code === 404) {
      err('File Not Found:\n', error)
      res.status(400).send("Bad Request");
      return;
    }
    err("Internal Server Error Making Image Public:\n", error);
    res.status(500).send("Internal Server Error");
  }
})

router.patch('/private', validateToken, async (req, res, next) => {
  const user = req['currentUser'];
  const filePath = JSON.parse(req.body).filePath;

  try {
    const data = await makeImgPrivate(user.uid, filePath);
    res.status(200).send({updatedFile: data[1]});
    return;
  } catch(error) {
    if (error.code === 404) {
      err('File Not Found:\n', error)
      res.status(400).send("Bad Request");
      return;
    }
    err("Internal Server Error Making Image Public:\n", error);
    res.status(500).send("Internal Server Error");
  }
})

router.delete("/remove", validateToken, async (req, res, next) => {
  const filePaths = JSON.parse(req.body).filePaths;
  const deleted = [];

  if (filePaths) {
    filePaths.forEach(path => {
      try {
        const dataPromise = deleteFile(path);
        deleted.push(dataPromise);
      } catch(error) {
        throw error;
      }
    });
  
    Promise.all(deleted)
    .then((values) => {
      res.status(200).send({deleted: values});
      return;
    })
    .catch((error) => {
      err("Internal Server Error Deleting Images:\n", error);
      res.status(500).send("Internal Server Error");
    });
  } else {
    res.status(400).send("Bad Request");
  }
})
module.exports = router;
