import express, { Response, Request, NextFunction } from "express";

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
  private gridSize: { X: number; Y: number } = { X: 10, Y: 10 };
  private robotVersion: number;

  constructor(robotVersion?: string) {
    this.robotVersion = parseInt(robotVersion) || 1;
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
    startPosition: { X: number; Y: number },
    movesArray: string[]
  ): number[] {
    let rotationAxis: number = 0;
    let currentPosition = startPosition;

    // verify if robot is version 1 or higher
    // if R +90 or L -90 from rotationAxis
    // if B -180deg then Y--
    // F X++

    for (let move of movesArray) {
      switch (move) {
        case "F": {
          if (currentPosition.Y >= 0 && currentPosition.Y < this.gridSize.Y) {
            currentPosition.Y++;
            console.log(currentPosition);
          }
          break;
        }
        case "B": {
          if (currentPosition.Y !== 0) {
            currentPosition.Y++;
            console.log(currentPosition);
          }
          break;
        }
        case "R": {
          if (currentPosition.X >= 0 && currentPosition.X < this.gridSize.X) {
            currentPosition.X++;
            console.log(currentPosition);
          }
          break;
        }
        case "L": {
          if (currentPosition.X !== 0) {
            currentPosition.X++;
            console.log(currentPosition);
          }
          break;
        }
        default:
          console.log("No movement");
      }
    }

    const finalPosition = [currentPosition.X, currentPosition.Y];

    return finalPosition;
  }

  public robotCommands(
    startingCoordinates: { X: number; Y: number },
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
