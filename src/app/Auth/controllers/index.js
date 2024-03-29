const jwtconfig = require("../../../config/jwt")
const jwt = require("jsonwebtoken")
const fs = require('fs');

const usersdb = fs.readFileSync("./src/db/users.json");
const USERSDB = JSON.parse(usersdb);

const routesFrontenddb = fs.readFileSync("./src/db/routesFrontend.json");
const ROUTESDB = JSON.parse(routesFrontenddb);

class UserModel {
    findByUsername(username) {
        const userSearch = USERSDB.filter(user => user.username === username)
        if(userSearch.length > 0) return userSearch[0]
        return undefined;
    }

}

const loginController = ( req , res) => {
    try {
        const { username, password } = req.body;


        if (username.trim() === '' || password.trim() ==='') res.status(401).json({ message: "Error de credenciales."})

        const user = new UserModel()
        
        const userSearch = user.findByUsername(username);
        console.log(userSearch)
        if (!userSearch) return res.status(401).json({ message: "Error de credenciales."})

        const payload = { user: userSearch, project_id: 'cocen-vista-interna' };

        const token = jwt.sign(payload, jwtconfig.key, jwtconfig.options);

        if (!payload) return res.status(401).json({ message: "Token invalid."})

        const routesApp = ROUTESDB.filter(app => app.app_id === payload.project_id)

        if(routesApp[0].length === 0) res.status(401).json({ message: "App is not register."})

        const routeApp = routesApp[0]

        const {app_id,app_name,app_description,app_url} = routeApp

        const profiles = routeApp.profiles.filter(profile => profile.profile_name === payload.user.role)

        if(!profiles) return res.status(401).json({ message: "Profile is not register."})

        const profile = profiles[0]

        const routesUser = profile.routes

        const configApp = { app_id,app_name,app_description,app_url }

        return res.json( { user: userSearch,token,configApp ,permissions: { app: routesUser , services: []} });
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Ocurrio un error en el servidor.' });
    }
}

const isTokenValidController = ( req , res) => {
    try {
        const {authorization,origin} = req.headers;

        const token = authorization.split(" ")[1];
        
        let payload = ''
        try {
            payload = jwt.verify(token, jwtconfig.key);
        } catch(err) {
            return res.status(401).json({ message: "Token invalid."})
        }


        const routesApp = ROUTESDB.filter(app => app.app_id === payload.project_id)

        if(!routesApp) res.status(401).json({ message: "App is not register."})

        const routeApp = routesApp[0]

        const {app_id,app_name,app_description,app_url} = routeApp

        const profiles = routeApp.profiles.filter(profile => profile.profile_name === payload.user.role)

        if(!profiles) res.status(401).json({ message: "Profile is not register."})

        const profile = profiles[0]

        const routesUser = profile.routes

        const configApp = { app_id,app_name,app_description,app_url }

        res.json( { configApp ,permissions: { app: routesUser , services: []} });
    } catch(error) {
        res.status(500).json({ message: 'Ocurrio un error en el servidor.',error });
    }
}
module.exports = {loginController,isTokenValidController }

