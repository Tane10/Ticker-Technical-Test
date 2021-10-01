import express, { Response, Request, NextFunction } from "express";
import { I2DVector } from "../modules";
import RobotSensorService from "./RobotSensor.service";
/**NOTE:
 * robot can't go in negative space
 * L and R now rotate 90degs
 * B we must rotate before going backwards
 * need to handle 500 robots
 *  still need to support the 500 mk1's we've got roaming around the place, so we'll need a strategy to cope with that somehow
 *
 * */

export default class RobotService {
  private movementCommandsArray: string[] = ["F", "B", "L", "R"];
  private gridSize: I2DVector = { X: 10, Y: 10 };
  private robotVersion: number;
  private standardRotation: number = 90;
  private robotSensorService: RobotSensorService;

  //default assumption facing along the X axis
  private MaxRotation: number = 0;

  constructor(robotVersion?: string) {
    this.robotVersion = parseInt(robotVersion) || 1;
    this.robotSensorService = new RobotSensorService(this.gridSize);
  }

  private formateRobotCommands(commands: string): string[] {
    if (commands.length != 0) {
      let formattedMovementCommandsArray: string[] = commands
        .toUpperCase()
        .split("")
        .filter((command) => this.movementCommandsArray.includes(command));

      return formattedMovementCommandsArray;
    } else {
      return null;
    }
  }

  private robotMovement(
    startPosition: I2DVector,
    movesArray: string[]
  ): number[] {
    //default assumption facing along the X axis
    let rotationAxis: number = 0;
    let currentPosition = startPosition;
    let lastMove = "";

    // if we are facing the right way then move i.e. rotationAxis = 0
    // if we are in the grid then move
    // if robot version is = 1 no rotation, if greater then 1 we rotate
    // if B & verion 2 if B -180deg then Y--
    // if move is idx 0 the treat vairy eveyrthin g
    // if pos % grid max != 1 or 0 then more

    // verify if robot is version 1 or higher
    // if R +90 or L -90 from rotationAxis
    // if B -180deg then Y--
    // F X++

    // verify if robot is version 1 or higher
    // if R +90 or L -90 from rotationAxis
    // if B -180deg then Y--
    // F X++

    for (const [idx, value] of movesArray.entries()) {
      switch (value) {
        case "F": {
          if (this.robotVersion !== 1) {
            if (this.robotSensorService.positionedInGrid(currentPosition)) {
              currentPosition.Y++;
              break;
            } else if (
              this.robotSensorService.inTheCorner(currentPosition, rotationAxis)
            ) {
              currentPosition.Y++;
              break;
            } else if (
              this.robotSensorService.movingOnTheEdge(
                currentPosition,
                rotationAxis
              )
            ) {
              currentPosition.Y++;
              break;
            } else {
              break;
            }
          } else {
            currentPosition.X++;
            break;
          }
        }
        case "B": {
          break;
        }
        case "R": {
          if (this.robotVersion !== 1) {
            rotationAxis = this.robotSensorService.rotateRobot(
              rotationAxis,
              "R"
            );
          } else {
            if (currentPosition.X >= 0 && currentPosition.X < this.gridSize.X) {
              currentPosition.X++;
              console.log(currentPosition);
            }
          }

          break;
        }
        case "L": {
          if (this.robotVersion !== 1) {
            rotationAxis = this.robotSensorService.rotateRobot(
              rotationAxis,
              "L"
            );
          } else {
            if (currentPosition.X !== 0) {
              currentPosition.X++;
              console.log(currentPosition);
            }
            break;
          }
        }
        default:
          console.log("No movement");
      }
    }

    const finalPosition = [currentPosition.X, currentPosition.Y];

    return finalPosition;
  }

  public robotCommands(
    startingCoordinates: I2DVector,
    movementCommands: string
  ): number[] {
    const formattedMovementCommands =
      this.formateRobotCommands(movementCommands);

    const finalPosition = this.robotMovement(
      startingCoordinates,
      formattedMovementCommands
    );

    return finalPosition;
  }
}
