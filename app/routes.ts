import express, { Router, Response, Request } from "express";

import robotFactory from "./robot.factory";

let router: Router = express.Router();

router.post("/robotspiders/commands/:robotVersion", robotFactory);

export default router;
