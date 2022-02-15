import { hash, compare } from "bcryptjs";
import connectToPetClient from "./connect-to-pet-client";

export const hashPassword = async (password) => {
  try {
    const hashedPW = await hash(password, 12);
    return hashedPW;
  } catch (err) {
    return { error: err.message };
  }
};

export const comparePassword = async (password, hashedPW) => {
  try {
    const isValid = await compare(password, hashedPW);
    return isValid;
  } catch (err) {
    return { error: err.message };
  }
};

export const getPetAccessToken = async () => {
  const client = connectToPetClient();
  return client.authenticate().then((resp) => resp.data.access_token);
};
