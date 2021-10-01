import { Response, Request, NextFunction } from "express";
import RobotService from "./services/robot.service";

export default function robotFactory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    startingCoordinates,
    movementCommands,
  }: {
    startingCoordinates: { X: number; Y: number };
    movementCommands: string;
  } = req.body;

  const { robotVersion } = req.params;
  const robotService = new RobotService(robotVersion);
  const position = robotService.robotCommands(
    startingCoordinates,
    movementCommands
  );

  res.send(position);
}
