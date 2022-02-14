import { hash, compare } from "bcryptjs";

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
