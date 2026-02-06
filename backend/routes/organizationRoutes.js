const express = require("express");
const { getOrganization, updateOrganization, listApiKeys, generateApiKey, revokeApiKey } = require("../controllers/organizationController");

const orgRouter = express.Router();
orgRouter.get("/list" ,getOrganization);
orgRouter.put("/update" ,updateOrganization);
orgRouter.get("/api/list" ,listApiKeys);
orgRouter.post("/api/generate" ,generateApiKey);
orgRouter.delete("/api/delete" ,revokeApiKey);

module.exports = orgRouter;