require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || "clave_secreta",
  tokenLife: "1h"
};
