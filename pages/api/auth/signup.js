import jwt from "jsonwebtoken";
import { hashPassword } from "../../../util/auth";
import { connectToDatabase } from "../../../util/connect-to-database";

async function handler(req, res) {
  // METHOD validation
  if (req.method !== "POST") {
    return res.status(401).json({
      message: "UnAuthorized method",
    });
  }

  const { email, name, password } = req.body;

  // INPUTS validation
  const emailIsValid = email && email.includes("@");
  const nameIsValid = name && name.trim() !== "";
  const passwordIsValid = password && password.trim().length > 3;
  const allInputsValid = emailIsValid && nameIsValid && passwordIsValid;
  if (!allInputsValid) {
    return res.status(401).json({
      message: "Input Validation Failed",
    });
  }

  let usersCollection;
  try {
    const client = await connectToDatabase();
    if (client.error) throw new Error(client.error);
    usersCollection = await client.db().collection("users");
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to connect to database",
    });
  }

  try {
    const existingUser = await usersCollection.findOne({ email: email });
    if (existingUser) {
      throw new Error("User exists already");
    }
  } catch (err) {
    return res
      .status(422)
      .json({ message: "Existing user, try to login instead" });
  }

  let hashedPW;
  try {
    hashedPW = await hashPassword(password);
    if (hashedPW.error) throw new Error(hashedPW.error);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to hash pw",
    });
  }

  const newUser = {
    email,
    name,
    password: hashedPW,
    favouritePets: [],
  };

  let result;
  try {
    result = await usersCollection.insertOne({ ...newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to insert",
    });
  }

  return res.status(201).json({
    message: "Sign up success",
  });
}

export default handler;
