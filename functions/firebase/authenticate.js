const { auth } = require('./fireAdmin')

const verifyIDToken = async (req, res, next) => {
 
  if (req.headers && req.headers.authorization &&
      req.headers.authorization.indexOf('Bearer ', 0) === 0) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    console.log(idToken);

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (error) {
      console.log(error)
    }
  }

  next();
}

const validateToken = (req, res, next) => {
  if (!req['currentUser']) {
    res.status(403).send({error: 'Unauthorized'});
    return false;
  }
  next();
  return true;
}

module.exports = {
  verifyIDToken,
  validateToken
};