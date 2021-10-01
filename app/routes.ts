import express, { Router, Response, Request } from "express";

import { robotCommands } from "./services/robotSpiders.service";

let router: Router = express.Router();

// const robotSpidersService = new RobotSpidersService();

/**
 * TODO:
 * make a post endpoint to accept a json body with mk type + commands + staring point (x,Y)
 *
 * NOTE: might need to add health check etc incase the MK goes down or offline
 */

router.post("/robotspiders/commands", robotCommands);
// router.post("/robotspiders/gridsize", robotSpidersService.setGridSize);

export default router;
