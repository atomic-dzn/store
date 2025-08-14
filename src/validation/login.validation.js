const AJV = require("ajv");
const ajv = new AJV();

class validation {
  static async check(schema, data) {
    const valid = await ajv.validate(schema, data);

    if (!valid) {
      return ajv.errors;
    } else {
      return null;
    }
  }

  static async register(data) {
    const schema = {
      type: "object",
      properties: {
        fullname: {
          type: "string",
          minLength: 3,
          maxLength: 60,
        },
        username: {
          type: "string",
          minLength: 3,
          maxLength: 60,
          pattern: "^[a-zA-Z0-9_]*$",
        },
        password: {
          type: "string",
          minLength: 3,
          maxLength: 60,
          pattern: "^[a-zA-Z0-9]*$",
        },
      },

      required: ["username", "password"],
      additionalProperties: false,
    };

    return await this.check(schema, data);
  }
  static async login(data) {
    const schema = {
      type: "object",
      properties: {
        username: {
          type: "string",
          minLength: 3,
          maxLength: 60,
          pattern: "^[a-zA-Z0-9_]*$",
        },
        password: {
          type: "string",
          minLength: 3,
          maxLength: 60,
          pattern: "^[a-zA-Z0-9]*$",
        },
      },

      required: ["username", "password"],
      additionalProperties: false,
    };

    return await this.check(schema, data);
  }
}

module.exports = validation;
