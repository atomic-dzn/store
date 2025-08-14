require("dotenv").config();
const jwt = require("jsonwebtoken");
const key = process.env.JWT_ACCESS_SECRET;

// An array to store revoked tokens
const revokedTokenList = [];

class service {
  static async hashPassword(password) {
    const hash = jwt.sign({ password }, key);
    return hash;
  }
  static async unhashPassword(password) {
    const unhash = jwt.verify({ password }, key);
    return unhash;
  }

  static async generateToken(data) {
    const token = jwt.sign(data, key);
    return token;
  }

  static async verifyToken(token) {
    try {
      const data = jwt.verify(token, key);
      if (await this.isTokenRevoked(token)) {
        throw new Error("Revoked token");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async revokeToken(token) {
    // Store the token in the revoked token list
    revokedTokenList.push(token);
  }

  static async isTokenRevoked(token) {
    // Check if the token is in the revoked token list
    return revokedTokenList.includes(token);
  }
}

module.exports = service;
