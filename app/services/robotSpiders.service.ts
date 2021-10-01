import { Response, Request, NextFunction } from "express";

//   private movementCommandsArray: string[] = ["F", "B", "L", "R"];
//   private mkVersion: number = 1;
const gridSize: { X: number; Y: number } = { X: 100, Y: 100 };

function formateRobotCommands(commands: string): string[] {
  const movementCommandsArray: string[] = ["F", "B", "L", "R"];
  let formattedMovementCommandsArray: string[] = commands
    .toUpperCase()
    .split("")
    .filter((command) => movementCommandsArray.includes(command));

  return formattedMovementCommandsArray;
}

function robotMovement(
  startPosition: { X: number; Y: number },
  movesArray: string[]
): [number, number] {
  let currentPosition = startPosition;

  // R = X++, L = X--
  // F = Y++, B = Y--

  for (let move of movesArray) {
    switch (move) {
      case "F": {
        if (currentPosition.Y <= 0 || currentPosition.Y !== gridSize.Y) {
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
        if (currentPosition.X <= 0 || currentPosition.X !== gridSize.X) {
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

export function robotCommands(req: Request, res: Response, next: NextFunction) {
  const {
    startingCoordinates,
    movementCommands,
  }: {
    startingCoordinates: { X: number; Y: number };
    movementCommands: string;
  } = req.body;

  const formattedMovementCommands = formateRobotCommands(movementCommands);

  const finalPosition = robotMovement(
    startingCoordinates,
    formattedMovementCommands
  );

  res.send(`this is my final postion: ${finalPosition}`);
}
