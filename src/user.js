import { v4 as uuidv4 } from 'uuid';
import {generateJWT} from './token';

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

    console.log(generateJWT(idUtilisateur));

    document.cookie = generateJWT(idUtilisateur)+"="+uuidv4()+";"+expires;
}

export function getUser() {
    let ans = undefined

    fetch('/_api/connectedUser')
    .then((res) => res.json())
    .then((eventsReponse) => {
        ans = eventsReponse
    })

    return ans
}