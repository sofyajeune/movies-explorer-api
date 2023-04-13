require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { NODE_ENV } = process.env;

const { PORT = '3000' } = process.env;
const { DBMONGO = 'mongodb://0.0.0.0:27017/bitfilmsdb' } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  PORT,
  DBMONGO,
};
