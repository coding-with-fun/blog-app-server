/**
 * @author @harsh2124
 * @description Request validation.
 */

/**
 * @description Importing package dependencies.
 */
const { check, validationResult, oneOf } = require("express-validator");

/**
 * @description Defining check conditions.
 */
const checks = {
    // For Sign In and Sign Up
    checkName: check("name")
        .not()
        .trim()
        .isEmpty()
        .withMessage("Name is required."),
    checkUserName: check("username")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Username must be at least 5 characters long."),
    checkEmail: check("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email."),
    checkPassword: check("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long."),
    checkConfirmPassword: check("confirmPassword")
        .trim()
        .isLength({ min: 5 })
        .withMessage(
            "Confirmation password must be at least 5 characters long."
        )
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords does not match.");
            }
            return true;
        }),

    // For post
    checkPostTitle: check("title")
        .not()
        .trim()
        .isEmpty()
        .withMessage("Post title is required.")
        .isLength({ max: 40 })
        .withMessage("Title must have at most 40 characters."),
    checkPostContent: check("content")
        .not()
        .trim()
        .isEmpty()
        .withMessage("Post content is required."),
    checkPostCleanContent: check("cleanContent")
        .not()
        .trim()
        .isEmpty()
        .withMessage("Post content is required.")
        .isLength({ min: 100 })
        .withMessage("Content must have at least 100 characters.")
        .isLength({ max: 10000 })
        .withMessage("Content must have at most 10000 characters."),
};

/**
 * @description Defining SignUp check.
 */
const signUpCheckReq = () => [
    checks.checkName,
    checks.checkUserName,
    checks.checkEmail,
    checks.checkPassword,
    checks.checkConfirmPassword,
];

/**
 * @description Defining SignIn check.
 */
const signInCheckReq = () => [checks.checkEmail, checks.checkPassword];

/**
 * @description Defining Post check.
 */
const postCheckReq = () => [
    checks.checkPostTitle,
    checks.checkPostContent,
    checks.checkPostCleanContent,
];

/**
 * @description Checking for errors.
 * @returns Array of errors
 */
const returnErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
        });
    }
    next();
};

module.exports = {
    validateSignUp: [signUpCheckReq(), returnErrors],
    validateSignIn: [signInCheckReq(), returnErrors],
    validateNewPost: [postCheckReq(), returnErrors],
};
