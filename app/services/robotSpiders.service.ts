import { Response, Request, NextFunction } from "express";

export class RobotSpidersService {
  //   private movementCommandsArray: string[] = ["F", "B", "L", "R"];
  //   private mkVersion: number = 1;
  private gridSize: { X: number; Y: number } = { X: 100, Y: 100 };

  public formateRobotCommands(commands: string): string[] {
    const movementCommandsArray: string[] = ["F", "B", "L", "R"];
    let formattedMovementCommandsArray: string[] = commands
      .toUpperCase()
      .split("")
      .filter((command) => movementCommandsArray.includes(command));

    return formattedMovementCommandsArray;
  }

  public robotMovement(
    startPosition: { X: number; Y: number },
    movesArray: string[]
  ): [number, number] {
    let currentPosition = startPosition;

    // R = X++, L = X--
    // F = Y++, B = Y--

    for (let move of movesArray) {
      switch (move) {
        case "F": {
          if (currentPosition.Y <= 0 || currentPosition.Y !== this.gridSize.Y) {
            currentPosition.Y++;
          }
          break;
        }
        case "B": {
          if (currentPosition.Y !== 0) {
            currentPosition.Y++;
          }
          break;
        }
        case "R": {
          if (currentPosition.X <= 0 || currentPosition.X !== this.gridSize.X) {
            currentPosition.X++;
          }
          break;
        }
        case "L": {
          if (currentPosition.X !== 0) {
            currentPosition.X++;
          }
          break;
        }
        default:
          console.log("No movement");
      }
    }

    console.log(currentPosition);

    return [10, 10];
  }

  public robotCommands(req: Request, res: Response) {
    const {
      startingCoordinates,
      movementCommands,
    }: {
      startingCoordinates: { X: number; Y: number };
      movementCommands: string;
    } = req.body;

    const formattedMovementCommands =
      this.formateRobotCommands(movementCommands);

    const finalPosition = this.robotMovement(
      startingCoordinates,
      formattedMovementCommands
    );

    res.send(`this is my final postion: ${finalPosition}`);
  }

  //   public setGridSize(req: Request, res: Response, next: NextFunction) {
  //     const { X, Y } = req.body;

  //     if (Math.sign(X) <= 0 && Math.sign(Y)) {
  //       this.gridSize = { X: X, Y: Y };
  //       res.send("Grid has been sized");
  //     } else {
  //       res.send("Grid can only be sized with positive numbers");
  //     }
  //   }
}
