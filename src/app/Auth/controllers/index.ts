import { Response, Request } from "express";
import jwtconfig from "../../../config/jwt";
import jwt from "jsonwebtoken";

const USERSDB: User[] = [
    {
        "username": "lsequeira",
        "password": "cocen123",
        "name": "lucas",
        "lastname": "sequeira",
        "email": "lsequeira@mail.com",
        "phone": "123456789",
        "address": "calle falsa 123",
        "store_id": 1,
        "role": "ADMIN"
    },{
        "username": "empleado_sac",
        "password": "cocen123",
        "name": "empleado",
        "lastname": "sac",
        "email": "empleado_sac@mail.com",
        "phone": "123456789",
        "address": "calle falsa 123",
        "store_id": 1,
        "role": "USER"
    },{
        "username": "supervisor_sac",
        "password": "cocen123",
        "name": "supervisor",
        "lastname": "sac",
        "email": "super@mail.com",
        "phone": "123456789",
        "address": "calle falsa 123",
        "store_id": 1,
        "role": "SUPERVISOR"
    }
]

type Role = "ADMIN" | "USER" | "SUPERVISOR";

type User = {
    "username": string,
    "password": string,
    "name": string,
    "lastname": string,
    "email": string,
    "phone": string,
    "address": string,
    "store_id": number,
    "role": Role
}

class UserModel {
    findByUsername(username: string): User | undefined {
        const userSearch = USERSDB.filter(user => user.username === username)
        if(userSearch.length > 0) return userSearch[0]
        return undefined;
    }

}

export const postController = async ( req: Request , res:Response ) => {
    try {
        const { username, password } = req.body;

        if (username.trim() === '' || password.trim() ==='') res.status(401).json({ message: "Error de credenciales."})

        const user = new UserModel()
        
        const userSearch = user.findByUsername(username);

        if (!userSearch) res.status(401).json({ message: "Error de credenciales."})

        const payload = { user: userSearch, project_id: 'esto-es-un-id' };

        const token = await jwt.sign(payload, jwtconfig.key, jwtconfig.options);

        res.json( { username,token });
    } catch(error) {
        res.status(500).json({ message: 'Ocurrio un error en el servidor.' });
    }
}

