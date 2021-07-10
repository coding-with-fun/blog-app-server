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
};

/**
 * @description Defining SignUp check.
 */
const signUpCheckReq = () => [
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
};
