import {generateJWT} from './token.js';

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
    document.cookie = "test="+generateJWT(idUtilisateur)+";"+expires;
}