import dotenv from "dotenv";
import type { Secret } from "jsonwebtoken";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET as Secret,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as Secret,
    expires_in: process.env.EXPIRES_IN as string,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    reset_password_token: process.env.RESET_PASSWORD_TOKEN as Secret,
    reset_password_token_expires_in: process.env
      .RESET_PASSWORD_TOKEN_EXPIRES_IN as string as string,
  },
  reset_password_link: process.env.RESET_PASSWORD_LINK as string,
  emailSender: {
    email: process.env.EMAIL as string,
    app_password: process.env.APP_PASSWORD as string,
  },
};
