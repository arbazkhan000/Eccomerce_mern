import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
}

export const jwtToken = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1d",
    });
};
