// normally i wouldnt have just cramped all the logic in routes but i wanted to keep it simple
// i would have seprated all the concerns into seperate files

import express from "express";
import bcrypt from "bcrypt";
import db from "../db/database.js";
import { signToken } from "../utils/jwt.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// signup/register
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res.status(400).json({ message: "Email already exists" });
          }
          return res.status(500).json({ message: "Internal server error" });
        }

        const token = signToken({ id: this.lastID, email });
        res.status(201).json({ token });
      },
    );
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken({ id: user.id, email: user.email });
    res.status(200).json({ token });
  });
});

// protected test route
router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
