const jwtconfig = {
    key: 'process.env.JWT_KEY',
    options: {
        expiresIn: '1d'
    }
}

module.exports = jwtconfig