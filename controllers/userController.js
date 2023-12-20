/** @format */

import bcrypt from "bcrypt";
import db from "../db/db.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    if (results.length > 0) {
      return res.status(400).send("Email already exists");
    }
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err) => {
        res.status(201).send("Signup successful");
      }
    );
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid credentials");
      }

      const match = await bcrypt.compare(password, results[0].password);

      if (!match) {
        return res.status(401).send("Invalid credentials");
      }

      res.status(200).send("Login successful");
    }
  );
};
