import { UserType } from "../types";
import db from "../libs/utils";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../libs/env";
import { getGoogleAuthUser } from "./IDP";

type User = Pick<UserType, "email" | "image_url" | "name" | "password">;

export const signup = async (payload: User) => {
  try {
    const { email, name, image_url, password } = payload;
    const checkUser = await db.oneOrNone(
      `
            SELECT * FROM users WHERE email = $(email)`,
      { email }
    );
    if (checkUser?.id) {
      throw new Error("Email Already exists");
    }
    const createdUser = await db.one<UserType>(
      `
            INSERT INTO users(email,name,image_url,password) VALUES($(email),$(name),$(image_url),$(password)) RETURNING name,email,image_url,id`,
      { email, name, image_url, password }
    );
    const token = sign({ id: createdUser.id }, JWT_SECRET!);
    return { token, user: createdUser };
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const signin = async (payload: Pick<UserType, "email" | "password">) => {
  try {
    const { email, password } = payload;
    const checkUser = await db.oneOrNone(
      `
            SELECT name,email,image_url,id FROM users WHERE email = $(email) AND password = $(password)`,
      { email, password }
    );
    if (!checkUser?.id) {
      throw new Error("invalid credentials");
    }
    const token = sign({ id: checkUser.id }, JWT_SECRET!);
    return { token, user: checkUser };
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const gLogin = async (payload: any) => {
  try {
    const gUser = await getGoogleAuthUser(payload.accessToken);
    const { email, name, picture, sub } = gUser;
    const password = "";
    const checkUser = await db.oneOrNone(
      `
            SELECT name,email,image_url,id FROM users WHERE email = $(email) AND password = $(password)`,
      { email, password }
    );
    if (!checkUser?.id) {
      const createdUser = await db.one<UserType>(
        `
                INSERT INTO users(google_user_id,email,name,image_url,password) VALUES($(sub),$(email),$(name),$(picture),$(password)) RETURNING name,email,image_url,id`,
        { sub, email, name, picture, password }
      );
      const token = sign({ id: createdUser.id }, JWT_SECRET!);
      return { token, user: createdUser };
    }
    const token = sign({ id: checkUser.id }, JWT_SECRET!);
    return { token, user: checkUser };
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};
