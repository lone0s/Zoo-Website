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

export function getUser() {
    let ans = undefined

    fetch('/_api/connectedUser')
    .then((res) => res.json())
    .then((eventsReponse) => {
        ans = eventsReponse
    })

    return ans
}