import jwt from "jsonwebtoken";

export function generateJWT(userId) {
    let jwtSecret = process.env.JWT_SECRET_KEY;
    const d = new Date();
    const joursExpiration = 1;
    d.setTime(d.getTime() + (joursExpiration*24*60*60*1000));
    let data = {
        id: userId,
        time: Date()
    }
    return jwt.sign(data, jwtSecret, {expiresIn: '3600'});
}

export function verifyJWT(token) {
    let jwtSecret = process.env.JWT_SECRET_KEY;
    const verified = jwt.verify(token, jwtSecret);
    if (!verified)
        throw new Error("Invalid token");
    return verified;
}

export function getTokenFromHeader(req) {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    const token = req.headers[tokenHeader];
    if (!token)
        throw new Error("No token");
    return token;
}

export function getConnectedUser(req){
    const token = getTokenFromHeader(req);
    try{
        const verified = verifyJWT(token);
        return verified.id;
    }
    catch (e) {
        console.log(e);
        return undefined;
    }
}