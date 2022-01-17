const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const jwtconfig = {
    key: process.env.JWT_KEY,
    options: {
        expiresIn: '1d'
    }
}

module.exports = jwtconfig