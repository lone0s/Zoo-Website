import { v4 as uuidv4 } from 'uuid';
import {generateJWT} from './token.js';
import {getUser, getUserByToken, deleteToken, addUserToken, findUser} from "../database/db.js";

export const Roles = {
    Admin : "admin",
    User : "client",
}

export const __admin = {
    id : 0,
    ndc : "Steduthu_admin",
    mdp : "1532",
    role : Roles.User,
}

export function setUserCookie(idUtilisateur) {
    const d = new Date();
    const joursExpiration = 1;
    d.setTime(d.getTime() + (joursExpiration*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    const token = generateJWT(idUtilisateur);
    // Experimentation soso
    // document.cookie = "test="+uuidv4()+";"+expires;
    document.cookie = "test=" + token + ";" + expires;
    addUserToken(idUtilisateur, token);
    console.log(document.cookie);
}

export function getUserCookie() {
    document.cookie.split(';').forEach((cookie) => {
        const [key, value] = cookie.split('=');
        if(key === "test") {
            console.log(value);
            return value;
        }
    });
    return null;
}

export function isLoggedIn() {
    let jwtSecret = process.env.JWT_SECRET_KEY;
    let cookies = document.cookie.split(";");
    let jwtCookie = cookies.find(c => c.trim().startsWith("test="));
    if (jwtCookie) {
        let jwt = jwtCookie.split("=")[1];
        try {
            let data = jwt.verify(jwt, jwtSecret);
            console.log(data);
            return getUserByToken(jwt);
        } catch (error) {
            console.log("Invalid JWT: ", error);
            return false;
        }
    }
    return false;
}


export function getConnectedUser() {
    let ans = undefined

    fetch('/_api/connectedUser')
    .then((res) => res.json())
    .then((eventsReponse) => {
        ans = eventsReponse
    })

    return ans
}
