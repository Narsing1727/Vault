const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const authRouter = express.Router();



authRouter.post("/register" , registerUser );
authRouter.post("/login" , loginUser);
authRouter.get("/dashboard" , authMiddleware , (req , res) => {
    return res.json({
        message : "Welcome"
});
})


module.exports = authRouter;