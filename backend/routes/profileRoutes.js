const express = require("express");
const { getProfile, updateProfile, getCurrentPlan, changePlan, cancelSubscription, getPaymentMethod, changePassword, setup2FA, verify2FA, deleteAccount } = require("../controllers/profileController");

const profileRouter = express.Router();
profileRouter.get("/profile/get" , getProfile);
profileRouter.put("/profile/update" , updateProfile);
profileRouter.get("/profile/billing" , getCurrentPlan);
profileRouter.put("/profile/billing" , changePlan);
profileRouter.post("/profile/update" , cancelSubscription);
profileRouter.get("/profile/billing/method" , getPaymentMethod);
profileRouter.get("/profile/password" , changePassword);
profileRouter.post("/profile/2fa/setup" ,setup2FA );
profileRouter.post("/profile/2fa/verify" ,verify2FA );
profileRouter.delete("/profile/delete" ,deleteAccount );


module.exports = profileRouter;