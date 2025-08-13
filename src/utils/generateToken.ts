import jwt from "jsonwebtoken";

const generateToken = (payload: any, secret: string, expiresIn: any) => {
  return jwt.sign(payload, secret, {
    expiresIn,
    algorithm: "HS256",
  });
};

export default generateToken;
