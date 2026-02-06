const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { internalTransfer } = require("../controllers/transferController");


const transferRouter = express.Router();


transferRouter.post("/internals" , authMiddleware ,internalTransfer );


module.exports = transferRouter;