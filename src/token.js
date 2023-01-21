import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

export function generateJWT(userId) {
    let jwtSecret = process.env.JWT_SECRET_KEY;
    let data = {
        id: userId,
        time: Date()
    }
    console.log(data);
    const token = jwt.sign(data, jwtSecret, {expiresIn: '3600'});
    return token;
}

export function verifyJWT(token) {
    let jwtSecret = process.env.JWT_SECRET_KEY;
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    const verified = jwt.verify(token, jwtSecret);
    if (!verified)
        throw new Error("Invalid token");
    return verified;
}