const express = require("express");
const { getSummary, balanceHistory, recentTransactions, accountBalances, accountList, singleAccountBalance, reviewTransfer } = require("../controllers/dashboardController");
const dashboardRouter = express.Router();

dashboardRouter.get("/summary" , getSummary);
dashboardRouter.get("/balance/monthly" , balanceHistory);
dashboardRouter.get("/recent" , recentTransactions);
dashboardRouter.get("/accounts/balances" , accountBalances);
dashboardRouter.get("/accounts/list" , accountList);
dashboardRouter.get("/accounts/:accountId/balance" , singleAccountBalance);
dashboardRouter.post("/accounts/transfer/review" , reviewTransfer );




module.exports = dashboardRouter;