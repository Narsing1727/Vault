const express = require("express");
const authRouter = require("./routes/authRoutes");
const transferRouter = require("./routes/transferRoutes");
const ledgerRouter = require("./routes/ledgerRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const profileRouter = require("./routes/profileRoutes");
const orgRouter = require("./routes/organizationRoutes");
const app = express();
app.use(express.json());


app.use('/auth' , authRouter );
app.use('/transfers' , transferRouter);
app.use('/ledger' , ledgerRouter);
app.use('/dashboard' , dashboardRouter);
app.use('/setting' , profileRouter);
app.use('/organization' , orgRouter);
app.listen(3000 , () => {
    console.log("Server is Running");
    
});