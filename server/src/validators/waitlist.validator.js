import { body } from "express-validator";

export const playerValidation = [
  body("playerName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Player name must be at least 3 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email required"),

  body("phone")
    .trim()
    .isMobilePhone("en-IN")
    .isLength({ min: 10, max: 10 })
    .withMessage("Enter a valid Indian mobile number"),

  body("game")
    .notEmpty()
    .withMessage("Game is required"),

  body("platform")
    .notEmpty()
    .withMessage("Platform is required"),

  body("priority")
    .notEmpty()
    .withMessage("Priority is required"),

  body("status")
    .notEmpty()
    .withMessage("Status is required"),
];