const Busboy = require('busboy');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { isMongoError } = require('../db/utils');
// const crypto = require('crypto');

const formDataParser = (req, res, next) => { 
  console.log('test');
  const busboy = new Busboy({
    headers: req.headers,
    limits: {
      // Cloud functions impose this restriction to 10 mb
      fileSize: 5 * 1024 * 1024,
    }
  });
  const tmpdir = os.tmpdir();
  const fields = {}; // This object will accumulate all the fields, keyed by their name
  const fileWrites = []; // This object will accumulate all the uploaded files, keyed by their name.
  const parsedFiles = [];

  // This code will process each non-file field in the form.
  busboy.on('field', (fieldName, val) => {
    console.log(`handling feild ${fieldName},: ${val}`)
    fields[fieldName] = val;
  });

  busboy.on('file', (fieldName, fileStream, fileName, encoding, mimeType) => {
    // Create write stream
    const filePath = path.join(tmpdir, fileName);
    console.log(`Handling file upload field ${fieldName}: ${fileName} (${filePath})`);
    const writeStream = fs.createWriteStream(filePath);

    // const key = crypto.createHash('sha256').update(String('some big ass secret')).digest('base64').substr(0, 32);
    // const iv = crypto.randomBytes(16);
    // const AES_ALGO = 'aes-256-cbc';
    // const cipher = crypto.createCipheriv(AES_ALGO, key, iv);
    // fileStream.pipe(cipher).pipe(writeStream)

    fileStream.pipe(writeStream)

    const fileWritePromise = new Promise((resolve, reject) => {
      fileStream.on('end', () => writeStream.end());

      writeStream.on('finish', () => {
        fs.readFile(filePath, (err, buffer) => {
          const size = Buffer.byteLength(buffer);
          console.log(`${fileName} is ${size} bytes`);
          if (err) {
            return reject(err);
          }

          parsedFiles.push({
            fieldname: fieldName,
            originalname: fileName,
            encoding,
            mimetype: mimeType,
            buffer,
            size,
          });

          try {
            fs.unlinkSync(filePath);
          } catch (error) {
            return reject(error);
          }

          resolve(true);
        });
      });

      writeStream.on('error', reject);

    });

    fileWrites.push(fileWritePromise);
  });

  busboy.on('finish', () => {
    Promise.all(fileWrites)
      .then(() => {
        req.body = fields;
        req.files = parsedFiles;
        next();
        return;
      })
      .catch(next);
  });

  busboy.end(req.rawBody);
};

const requestErrorHandler = (req, res, intlErrMsg, reqErrMsg) => { 
  if (isMongoError(error)) {
    err(intlErrMsg, error);
    res.status(500).send('Internal server error');
  } else {
    log(reqErrMsg, error);
    res.status(400).send('Bad Request');
  }
};

module.exports = {
  formDataParser,
  requestErrorHandler,
};