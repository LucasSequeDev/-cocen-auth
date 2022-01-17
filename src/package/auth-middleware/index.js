const axios = require('axios');

const AuthMiddleware = (req,res,next) => {
    try {
        const authorization = req.headers['authorization'];
        const xApiKey = req.headers['x-api-key'];

        if(!authorization && !xApiKey) return res.status(401).json({ message: "Token invalid."})

        const token = authorization ? { authorization } : {'x-api-key':xApiKey};

        axios.defaults.headers.common = {...token,origin:req.originalUrl};

        axios.get(`http://localhost:4005/api/auth/check`).then(response => {
            const userData = response.data;
            req.user = userData;
        })
        .catch(error => res.status(401).json({ message: "Token invalid."}))
        .finally(() => next() )
    } catch(error) {
        res.status(401).json({ message: "Token invalid."});
    }
}

module.exports = AuthMiddleware