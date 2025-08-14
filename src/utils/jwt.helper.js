const jwt = require("jsonwebtoken");
const config = require("../config");

class jwtHelper {
  async generateAccessToken(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = jwt.sign(payload, config.jwt.access.secret, {
          expiresIn: config.jwt.access.expiresIn,
          audience: "access",
          issuer: "market app",
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }

  async generateRefreshToken(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = jwt.sign(payload, config.jwt.refresh.secret, {
          expiresIn: config.jwt.refresh.expiresIn,
          audience: "refresh",
          issuer: "market app",
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }

  async verifyAccessToken(token) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(token, config.jwt.access.secret);

        const decoded = jwt.verify(token, config.jwt.access.secret);
        console.log(decoded);
        
        resolve(decoded);
      } catch (error) {

        reject(error);
      }
    });
  }

  async verifyRefreshToken(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.verify(token, config.jwt.refresh.secret);
        resolve(decoded);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = jwtHelper;
