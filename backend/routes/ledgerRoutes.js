const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { completeTransaction, fundAccount, verifyTransactionInvariant, verifyGlobal, verifyLedgerChain } = require("../controllers/ledgerController");



const ledgerRouter = express.Router();


ledgerRouter.post("/complete/:txId" , authMiddleware , completeTransaction );
ledgerRouter.post("/account/:accountId/fund"  , fundAccount );
ledgerRouter.post("/verify/:txId" ,authMiddleware , verifyTransactionInvariant );
ledgerRouter.get("/verify/global" ,authMiddleware , verifyGlobal );
ledgerRouter.get("/verify/chain"  , verifyLedgerChain );



module.exports = ledgerRouter;