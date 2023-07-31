const router = require("express").Router();

const authController = require("../controllers/authController");

router.post("/login", authController.login);

router.post("/register", authController.register, authController.sendOTP);

router.post("/send-otp", authController.register);

router.post("/verified-otp", authController.verifiedOTP);

router.post("/send-otp", authController.register);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);

module.exports = router;
