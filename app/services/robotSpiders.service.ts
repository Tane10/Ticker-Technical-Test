import e, { Response, Request, NextFunction } from "express";

//   private movementCommandsArray: string[] = ["F", "B", "L", "R"];
//   private mkVersion: number = 1;
const movementCommandsArray: string[] = ["F", "B", "L", "R"];
const gridSize: { X: number; Y: number } = { X: 10, Y: 10 };

export function formateRobotCommands(commands: string): string[] {
  if (commands.length != 0) {
    let formattedMovementCommandsArray: string[] = commands
      .toUpperCase()
      .split("")
      .filter((command) => movementCommandsArray.includes(command));

    return formattedMovementCommandsArray;
  } else {
    return null;
  }
}

export function robotMovement(
  startPosition: { X: number; Y: number },
  movesArray: string[]
): number[] {
  let currentPosition = startPosition;

  for (let move of movesArray) {
    switch (move) {
      case "F": {
        if (currentPosition.Y >= 0 && currentPosition.Y < gridSize.Y) {
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
        if (currentPosition.X >= 0 && currentPosition.X < gridSize.X) {
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

// export function validMKPosition(coordinates: {
//   X: number;
//   Y: number;
// }): boolean {
//   let valid: boolean = false;

//   if (coordinates.X >= 0 && coordinates.X < gridSize.X) {
//     valid = true;
//   }
//   if (coordinates.Y >= 0 && coordinates.Y < gridSize.Y) {
//     valid = true;
//   }

//   return valid;
// }

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

  res.send({ FinalPosition: finalPosition });
}
